# Forgot Password

1: User submit email.
2: Generate Otp.
3: store otp in db and set expiry.
4: send otp on email.

5: User submit otp.
6: verify otp.
7: mark isVerified.

8: User submit new password with email.
9: hash password and store -> db.
10: generate accessToken and refreshToken.

# Register Account

1: User submit emai, password, zipcode, fullname,username.
2: Create account in db but status is unVerified.
3: Generate Otp.
4: store normal otp to hash in db.
5: send on email otp with purpose.

6: User submit otp.
7: verify otp.
8: change userStatus isVerified.

10: User submit password and confirm password.
11: store password in hash.
12: generate access and refreshToken

# Login Account

1: User submit email and password.
2: check user is Authenticated.
3: return access and refreshToken

# Change Password

1: send otp on email.
2: verify otp.
3: and change password.

# change email 

1: send otp on email.
2: verify sended otp.
3: and change user primary email.
4: return user updated document.
