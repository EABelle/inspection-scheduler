
class GenericAssembler {
  static convertIn(input, output) {
    for (const key of Object.keys(output)) {
      if (input[key]) {
        output[key] = input[key];
      }
    }
  }
}

module.exports = GenericAssembler;
