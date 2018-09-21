"use strict";

// Create and print a new RFC4122 (https://tools.ietf.org/html/rfc4122) random UUID.
// Based on the toybox implementation.

// See https://tools.ietf.org/html/rfc4122, specifically section 4.4
// "Algorithms for Creating a UUID from Truly Random or Pseudo-Random
// Numbers".
function create_uuid() {
  let uuid = new Uint8Array(16);

  // "Set all the ... bits to randomly (or pseudo-randomly) chosen values".
  window.crypto.getRandomValues(uuid);

  // "Set the four most significant bits ... of the time_hi_and_version
  // field to the 4-bit version number [4]".
  uuid[6] = (uuid[6] & 0x0F) | 0x40;
  // "Set the two most significant bits (bits 6 and 7) of
  // clock_seq_hi_and_reserved to zero and one, respectively".
  uuid[8] = (uuid[8] & 0x3F) | 0x80;

  return uuid;
}

function uuid_to_string(uuid) {
  let result = "";

  for (let i = 0; i < uuid.length; ++i) {
    result += ((uuid[i] >> 4) & 0xf).toString(16);
    result += ((uuid[i] >> 0) & 0xf).toString(16);
    if (i == 3 || i == 5 || i == 7 || i == 9) result += '-';
  }

  return result;
}

function generate_uuid(id) {
  document.getElementById(id).value = (uuid_to_string(create_uuid()));
}

function copy_to_clipboard(id) {
  document.getElementById(id).select();
  document.execCommand('copy');
  window.getSelection().removeAllRanges();
}
