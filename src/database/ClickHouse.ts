import {
  ClickHouseClient,
  ClickHouseClientConfigOptions,
  createClient,
} from '@clickhouse/client';
import { createTable } from './queries';
import { TABLE_NAME } from './constants';
import { Transaction } from './interfaces/transaction';
import { TransactionEntity } from './transaction.entity';

export interface ClickHouseConfig extends ClickHouseClientConfigOptions {
  host: string;
  username: string;
  password: string;
  database: string;
}

const DEFAULT_CONFIG: ClickHouseConfig = {
  host: 'http://localhost:8123',
  username: 'default',
  password: '',
  database: 'parser',
};

export class ClickHouse {
  private readonly config: ClickHouseConfig;
  private readonly client: ClickHouseClient;

  constructor(config: ClickHouseConfig = DEFAULT_CONFIG) {
    this.config = config;

    if (!this.config) {
      throw new Error('Configuration cannot be empty');
    }

    this.client = createClient(this.config);
  }

  private async createTable() {
    if (!this.client && !(await this.client.ping())) {
      throw new Error(
        'Problems with the client, please check the correctness of the options',
      );
    }

    await this.client.query({ query: createTable });
  }

  async insert(transaction: Transaction): Promise<void>;
  async insert(transactions: Transaction[]): Promise<void>;
  async insert(t: Transaction | Transaction[]): Promise<void> {
    if (!Array.isArray(t)) {
      const q = new TransactionEntity();
      q.from = t.from;
    }

    await this.client.insert({
      table: TABLE_NAME,
      values: Array.isArray(t) ? t : [t],
    });
  }
}
