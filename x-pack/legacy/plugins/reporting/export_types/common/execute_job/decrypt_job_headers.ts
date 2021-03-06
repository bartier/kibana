/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { i18n } from '@kbn/i18n';
import { cryptoFactory } from '../../../server/lib/crypto';
import { CryptoFactory, Logger } from '../../../types';

interface HasEncryptedHeaders {
  headers?: string;
}

// TODO merge functionality with CSV execute job
export const decryptJobHeaders = async <
  JobParamsType,
  JobDocPayloadType extends HasEncryptedHeaders
>({
  encryptionKey,
  job,
  logger,
}: {
  encryptionKey?: string;
  job: JobDocPayloadType;
  logger: Logger;
}): Promise<Record<string, string>> => {
  const crypto: CryptoFactory = cryptoFactory(encryptionKey);
  try {
    const decryptedHeaders: Record<string, string> = await crypto.decrypt(job.headers);
    return decryptedHeaders;
  } catch (err) {
    logger.error(err);

    throw new Error(
      i18n.translate(
        'xpack.reporting.exportTypes.common.failedToDecryptReportJobDataErrorMessage',
        {
          defaultMessage:
            'Failed to decrypt report job data. Please ensure that {encryptionKey} is set and re-generate this report. {err}',
          values: { encryptionKey: 'xpack.reporting.encryptionKey', err: err.toString() },
        }
      )
    );
  }
};
