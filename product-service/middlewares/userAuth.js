const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  try {
    let token = req.cookies?.token;

    if (!token) {
      const authHeader =
        req.headers.authorization;

      if (
        authHeader &&
        authHeader.startsWith(
          "Bearer "
        )
      ) {
        token =
          authHeader.split(
            " "
          )[1];
      }
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message:
        "Invalid token",
    });
  }
};

exports.isAdmin = (
  req,
  res,
  next
) => {
  try {
    if (
      req.user.role !==
      "admin"
    ) {
      return res
        .status(403)
        .json({
          success: false,
          message:
            "Admin only",
        });
    }

    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message:
        "Unauthorized",
    });
  }
};