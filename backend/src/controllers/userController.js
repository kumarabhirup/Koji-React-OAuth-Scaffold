const slugify = require('slugify')
const jwt = require('jsonwebtoken')

const { store, authentication } = require('../db')
const isAccessTokenValid = require('../utils/isAccessTokenValid')
const generateToken = require('../utils/generateToken')
const isValidEmail = require('../utils/validateEmail')

exports.signIn = async (req, res, next) => {
  // Data Validation // TODO: Validate all other fields such as name and profilePicture
  if (req.body.socialId === undefined || !isValidEmail(req.body.email)) {
    return res.status(400).json({
      error: {
        message: "Inefficient data provided"
      }
    });
  }

  // Verify token
  const isValid = await isAccessTokenValid(req.body.signUpMethod, req.body.accessToken);
  if(!isValid) {
    return res.status(401).json({
      error: {
        message: "Failed to recognize you"
      }
    });
  }

  // Check if user is already signedUp!
  const signedUser = await store.read('User', { search: { socialId: req.body.socialId } }).then(data => data[0]);
  if(!signedUser) {
    try {
      // Create new user
      const toAppend = {
        id: generateToken(10, { lower: true }),
        name: req.body.name,
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        socialId: req.body.socialId,
        signUpMethod: req.body.signUpMethod,
        accessToken: req.body.accessToken,
        profilePicture: req.body.profilePicture,
        username: `${slugify(req.body.name, { lower: true, replacement: '_' })}_${Math.floor(Math.random() * 99) + 1}` // john_doe_65 (random number between 1 to 100 to avoid overriding of usernames)
      };

      const newUser = await store.append('User', [toAppend]).then(async res => {
        // res -> { "updatedRange": "Sheet1!A6:D6" } [but we need to return newUser and not the updatedRange]
        return await store.read('User', { search: { id: toAppend.id } }).then(data => data[0]);
      });

      const token = jwt.sign({ userId: newUser.id, signUpMethod: newUser.signUpMethod }, process.env.JWT_SECRET, { expiresIn: "5 days" });

      return res.status(200).json({
        message: "SignUp Successful",
        data: {
          token
        }
      });
    } catch (error) {
      return res.status(422).json({
        error: {
          message: "Either inefficient data was provided or the server was at fault",
          error
        }
      });
    }
  }

  // If user already signed up, update the accessToken!
  await store.edit('User', {
    search: { socialId: req.body.socialId },
    set: { 
      accessToken: req.body.accessToken,
      email: req.body.email // TODO: Handle email match conflicts if email got changed
    }
  });

  const token = jwt.sign({ userId: signedUser.id, signUpMethod: signedUser.signUpMethod }, process.env.JWT_SECRET);

  return res.status(200).json({
    message: "SignIn Successful",
    data: {
      token
    }
  });
}

exports.getUser = async (req, res, next) => {
  const token = req.body.token;
  // Check if token is decodable
  try {
    jwt.decode(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(400).json({
      error: {
        message: "Failed to decode the token"
      }
    });
  }

  const decoded = jwt.decode(token, process.env.JWT_SECRET);
  const userId = decoded && decoded.userId;

  // Find the user in the database
  const user = await store.read('User', { limit: 1, search: { id: userId } }).then(data => data[0]);
  if(user) {
    delete user.accessToken; delete user.socialId; // Do not expose accessToken to the client
    return res.status(200).json({
      message: "Token Validated",
      data: {
        user
      }
    });
  }

  return res.status(401).json({
    error: {
      message: "Invalid token provided"
    }
  });
}