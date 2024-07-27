import { KAFKA_BROKERS, KAFKA_CLIENT_ID, KAFKA_GROUP_ID, KAFKA_SUBSCRIBE_TOPIC, KAFKA_RETRT, KAFKA_RETRT_TIME } from '../config';

export const kafkaConfig: any =  {
  brokers: KAFKA_BROKERS,
  clientId: KAFKA_CLIENT_ID,
  groupId: KAFKA_GROUP_ID,
  topics: KAFKA_SUBSCRIBE_TOPIC,
  retry: KAFKA_RETRT,
  retryTime: KAFKA_RETRT_TIME,
};
