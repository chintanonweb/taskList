import { TestBed } from '@angular/core/testing';

import { TaskListInterceptor } from './task-list.interceptor';

describe('TaskListInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TaskListInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TaskListInterceptor = TestBed.inject(TaskListInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
