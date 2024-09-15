import { ResponseDtoType } from '@common/common.decorator';
import { ErrDesc } from '@common/constants/error.constants';
import { DtoResponse } from '@common/dtos/dto.response';
import { NoContentExceptionFilter } from '@common/filter/no-content.exception.filter';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseFilters } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotImplementedResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { BoardsService } from './boards.service';
import { RequestDeleteBoardsDto, ResponseDeleteBoardsDto } from './dtos/delete-boards.dto';
import { RequestGetBoardsDto, ResponseBoardsDto, ResponseBoardsPageDto } from './dtos/get-boards.dto';
import { RequestPatchBoardsDto, ResponsePatchBoardsDto } from './dtos/patch-boards.dto';
import { RequestSetBoardsDto } from './dtos/set-boards.dto';

@ApiTags('boards')
@ApiBadRequestResponse({
  description: `${ErrDesc.BAD_REQUEST__WRONG_PARAMETER}`,
})
@ApiInternalServerErrorResponse({ description: ErrDesc.INTERNAL_SERVER_ERROR })
@ApiNotImplementedResponse({ description: ErrDesc.NOT_IMPLEMENTED })
@Controller('boards')
@UseFilters(NoContentExceptionFilter)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @ApiOperation({
    summary: '게시글 목록 API',
    description: '게시글 목록 정보를 가져온다',
  })
  @Get('')
  @ResponseDtoType(ResponseBoardsPageDto)
  async getBoardList(@Query() requestDto: RequestGetBoardsDto): Promise<DtoResponse<ResponseBoardsPageDto>> {
    const result = await this.boardsService.getBoards(requestDto);
    return { code: ErrDesc.OK__SUCCESS, data: result };
  }

  @ApiOperation({
    summary: '게시글 작성 API',
    description: '게시글 작성한다.',
  })
  @Post('')
  @ResponseDtoType(ResponseBoardsDto)
  async setBoards(@Body() requestDto: RequestSetBoardsDto): Promise<DtoResponse<ResponseBoardsDto>> {
    const result = await this.boardsService.setBoards(requestDto);
    return { code: ErrDesc.OK__SUCCESS, data: result };
  }

  @ApiOperation({
    summary: '게시글 수정 API',
    description: '게시글 수정한다.',
  })
  @Patch('/:boardSeq')
  @ApiParam({ name: 'boardSeq', required: true })
  @ResponseDtoType(ResponsePatchBoardsDto)
  async patchBoard(@Param('boardSeq') boardSeq: number, @Body() requestDto: RequestPatchBoardsDto): Promise<DtoResponse<ResponsePatchBoardsDto>> {
    const result = await this.boardsService.patchBoard(boardSeq, requestDto);
    return { code: ErrDesc.OK__SUCCESS, data: result };
  }

  @ApiOperation({
    summary: '게시글 삭제 API',
    description: '게시글을 삭제한다.',
  })
  @Delete('/:boardSeq')
  @ResponseDtoType(ResponseDeleteBoardsDto)
  async deleteBoard(@Param('boardSeq') boardSeq: number, @Body() requestDto: RequestDeleteBoardsDto): Promise<DtoResponse<ResponseDeleteBoardsDto>> {
    const result = await this.boardsService.deleteBoards(boardSeq, requestDto);
    return { code: ErrDesc.OK__SUCCESS, data: result };
  }
}
