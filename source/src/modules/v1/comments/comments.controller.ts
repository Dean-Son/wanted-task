import { ResponseDtoType } from '@common/common.decorator';
import { ErrDesc } from '@common/constants/error.constants';
import { DtoResponse } from '@common/dtos/dto.response';
import { NoContentExceptionFilter } from '@common/filter/no-content.exception.filter';
import { Body, Controller, Get, Param, Post, Query, UseFilters } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotImplementedResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { CommentsService } from './comments.service';
import { RequestGetCommentsDto, ResponseGetCommentsDto } from './dtos/get-comments.dto';
import { RequestSetCommentsDto, ResponseSetCommentsDto } from './dtos/set-comments.dto';

@ApiTags('boards')
@ApiBadRequestResponse({
  description: `${ErrDesc.BAD_REQUEST__WRONG_PARAMETER}`,
})
@ApiInternalServerErrorResponse({ description: ErrDesc.INTERNAL_SERVER_ERROR })
@ApiNotImplementedResponse({ description: ErrDesc.NOT_IMPLEMENTED })
@Controller('boards')
@UseFilters(NoContentExceptionFilter)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({
    summary: '게시글 목록 API',
    description: '게시글 목록 정보를 가져온다',
  })
  @Get('/:boardSeq/comments')
  @ApiParam({ name: 'boardSeq', required: true })
  @ResponseDtoType(ResponseGetCommentsDto)
  async getCollectionList(
    @Param('boardSeq') boardSeq: number,
    @Query() requestDto: RequestGetCommentsDto,
  ): Promise<DtoResponse<ResponseGetCommentsDto[]>> {
    const result = await this.commentsService.getComments(boardSeq, requestDto);
    return { code: ErrDesc.OK__SUCCESS, data: result };
  }

  @ApiOperation({
    summary: '게시글 작성 API',
    description: '게시글 작성한다.',
  })
  @Post('/:boardSeq/comments')
  @ApiParam({ name: 'boardSeq', required: true })
  @ResponseDtoType(ResponseSetCommentsDto)
  async setCollectionList(
    @Param('boardSeq') boardSeq: number,
    @Body() requestDto: RequestSetCommentsDto,
  ): Promise<DtoResponse<ResponseSetCommentsDto>> {
    const result = await this.commentsService.setComment(boardSeq, requestDto);
    return { code: ErrDesc.OK__SUCCESS, data: result };
  }
}
