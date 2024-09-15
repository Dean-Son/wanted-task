import { AsyncFunctionType, ErrorCallbackFunctionType } from '@common/interface/common.interface';
import { HttpException, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class TransactionSupport {
  constructor(private readonly connection: Connection) {}

  /**
   * 트랜잭션
   *
   * @description 트랜잭션 관리를 단일 클래스에서 컨트롤하도록 중앙화
   * @param {AsyncFunctionType} func 콜백함수
   * @param {AsyncFunctionType} errorCallback 에러 콜백함수
   * @returns {Promise<unknown>}
   */
  async transact<R = unknown>(func: AsyncFunctionType, errorCallback: ErrorCallbackFunctionType = this.defaultHandleError): Promise<R> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    //트랜잭션 시작
    await queryRunner.startTransaction();
    try {
      const res = (await func(queryRunner)) as R;
      await queryRunner.commitTransaction();
      return res;
    } catch (e) {
      //에러시 롤백
      await queryRunner.rollbackTransaction();
      errorCallback(e);
      return null;
    } finally {
      await queryRunner.release();
    }
  }

  defaultHandleError(error: any) {
    //에러시 롤백
    throw new HttpException(error.message, error.status ?? 500);
  }
}
