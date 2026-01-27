# User Model

01: fullname -> string -> optional;
02: email -> string -> uniuqe -> required;
03: username -> string -> uniuqe -> optional;
04: avatar -> string -> optional;
05: googleId -> string -> optional;
06: facebookId -> string -> optional;
07: appleId -> string -> optional;
08: phoneNumber -> {
    countryCode -> string -> optional;
    nationalNumber -> string -> optional;
}
09: dob -> date -> optional;
10: gender -> string -> optional;
11: lastSeen -> date -> optional;
12: password -> string -> optional;
14: refreshToken -> string -> optional;
15: status -> string -> required;
16: type -> string -> required; 

# Otp Model

01: userId -> objectId -> required;
02: otp -> string -> required;
03: otpExpiry -> date -> required;
04: purpose -> string -> required;
13: isVerified -> boolean -> required;

# Address Model

01: userId -> objectId -> required;
02: country -> string -> optional;
03: city -> string -> optional;
04: streetAddress -> string -> optional;
05: area -> string -> optional;
06: postalCode -> number -> optional;
07: isDefault -> boolean -> required / fasle;

# Category Model

01: owner -> objectId -> required;
02: parent -> objectId -> required;
03: title -> string -> required;
04: image -> string -> required;
05: status -> string -> required;

# Brand Model

01: brand -> string -> required;
02: status -> string -> required;

# Wishlist Model

01: productId -> objectId -> required;
02: owner -> objectId -> required;

# Review Model

01: productId -> objectId -> required;
02: orderId -> objectId -> required;
03: reviewerId -> objectId -> required;
04: targetUserId -> objectId -> required;
05: review -> string -> required;
06: rate -> number -> required;
07: type -> string -> required;
08: status -> string -> required;

# Follow Model

01: followerId -> objectId -> required;
02: followingId -> objectId -> required;

# Chat Model

01: members -> array / objectId -> min and max 2 members required;
02: lastMessage -> objectId -> required;

# Message Moodel

01: chatId -> objectId -> required;
02: senderId -> objectId -> required;
03: recieverId -> objectId -> required;
04: content -> string -> required;
05: status -> string -> required;