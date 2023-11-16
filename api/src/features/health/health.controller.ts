import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { Public } from '~/decorators/public.decorator';
import { RedisHealthIndicator } from '../util/redis/redis.indicator';
import { DatabaseHealthIndicator } from '../database/database.health';
import { NetworksHealthIndicator } from '../util/networks/networks.health';
import { InjectRedis } from '@songkeys/nestjs-redis';
import Redis from 'ioredis';
import { InjectRedisSubscriber } from '~/decorators/redis.decorator';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private dbHealth: DatabaseHealthIndicator,
    private redisHealth: RedisHealthIndicator,
    private providerHealth: NetworksHealthIndicator,
    @InjectRedis()
    private readonly redis: Redis,
    @InjectRedisSubscriber()
    private readonly redisSub: Redis,
  ) {}

  @Public()
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.dbHealth.check('Database'),
      () => this.redisHealth.check('Redis::default', this.redis),
      () => this.redisHealth.check('Redis::subscriber', this.redisSub),
      () => this.providerHealth.check('Provider'),
    ]);
  }
}
