class GameConsole {
  constructor(source) {
    this.instructions = source.split('\n').map((str) => {
      const [op, arg] = str.split(' ');
      return { op, arg: Number(arg.replace('+', '')) };
    });

    this.acc = 0;
    this.programCounter = 0;
  }

  get isHalted() {
    return this.programCounter === this.instructions.length;
  }

  step() {
    const { op, arg } = this.instructions[this.programCounter];

    switch (op) {
      case 'acc':
        this.acc += arg;
        this.programCounter += 1;
        break;
      case 'jmp':
        this.programCounter += arg;
        break;
      case 'nop':
        this.programCounter += 1;
        break;
      default:
        throw new Error('INVALID OPCODE');
    }
  }
}

module.exports = GameConsole;
