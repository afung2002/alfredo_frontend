//get user from clerk and store role in context
// import { useUser } from '@clerk/clerk-react';
import { createContext, useContext, useEffect, useState } from 'react';

interface UserContextType {
  user: any;
  setUser: (user) => void;
  userRole: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // const { user: clerkUser } = useUser();
  // Bypass Clerk for demo - provide mock user
  const mockUser = { id: 'demo-user', publicMetadata: { role: 'fund_manager' } };
  const [userRole, setUserRole] = useState<string | null>('fund_manager');
  useEffect(() => {
    // if (clerkUser) {
    //   setUserRole(clerkUser.publicMetadata.role as string);
    // }
    setUserRole('fund_manager');
  }, []);
  return <UserContext.Provider value={{ user: mockUser, setUser: setUserRole, userRole }}>{children}</UserContext.Provider>;
};


export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
