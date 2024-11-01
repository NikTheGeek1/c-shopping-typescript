import { usersRepo } from '../db-repo'

interface User {
  _id: string;
  role: string;
  root: boolean;
}

async function identityMiddleware(
  req: Request, 
  identity: 'user' | 'admin' | 'root' = 'user', isJwt: boolean = false): Promise<void> {
  if (identity === 'user' && isJwt === false) {
    return;
  }

  const userId = req.headers.get('userId');
  if (!userId) {
    throw new Error('User ID not found in headers');
  }

  const user: User | null = await usersRepo.getOne({ _id: userId });
  if (!user) {
    throw new Error('User not found');
  }

  req.headers.set('userRole', user.role);
  req.headers.set('userRoot', user.root.toString());

  if (identity === 'admin' && user.role !== 'admin') {
    throw new Error('Unauthorized operation');
  }

  if (identity === 'root' && !user.root) {
    throw new Error('Unauthorized operation, only root users can perform this action');
  }

}

export { identityMiddleware }
