import { Test, TestingModule } from '@nestjs/testing';
import { BookCommentService } from './bookcomment.service';

describe('BookcommentService', () => {
  let service: BookCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookCommentService],
    }).compile();

    service = module.get<BookCommentService>(BookCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
