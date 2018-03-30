import { ScoreService } from './score.service';
import { async, TestBed } from '@angular/core/testing';

describe('Score Service', () => {
  let service: ScoreService;
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        providers: [ScoreService]
      });
      service = TestBed.get(ScoreService);
    })
  );

  it('should have a service', () => {
    expect(service).toBeDefined();
  });

  it('should increment count', () => {
    service.score = 0;
    service.incrementScore();
    expect(service.score).toBe(1);
  });

  it('should decrement count', () => {
    service.decrementScore();
    expect(service.score).toBe(0);
  });
  
  it('should not decrement count when count is zero', () => {
    service.decrementScore();
    expect(service.score).toBe(0);
  });  
});
