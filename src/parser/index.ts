import { ClickHouse } from '../database/ClickHouse';

interface Range {
  from: number;
  to?: number;
}

interface ParserOptions {
  provider?: string;
  batchSize: number;
  blockRange: Range;
  // TODO
  database: any;
}

const DEFAULT_OPTIONS: ParserOptions = {
  batchSize: 100,
  blockRange: { from: 0 },
  database: new ClickHouse(),
};

class Parser {
  private options: ParserOptions = DEFAULT_OPTIONS;

  setProvider(provider: string): this {
    this.options.provider = provider;
    return this;
  }

  setBatchSize(size: number): this {
    if (size <= 0) {
      // TODO
      throw new Error();
    }

    this.options.batchSize = size;
    return this;
  }

  setBlockRange(range: Range): this {
    this.options.blockRange = range;
    return this;
  }

  // TODO
  setDatabase(database: any): this {
    this.options.database = database;
    return this;
  }

  run() {
    if (!this.options.provider) {
      // TODO
      throw new Error();
    }
  }
}
