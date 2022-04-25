/* eslint-disable @typescript-eslint/naming-convention */
export interface Todo {
  id: number;
  created_at?: string;
  due_date: string;
  task: string;
  user_id?: string;
  category: string;
  priority: string;
  is_done: boolean;
}
