
import { createContext } from 'react'
import { User } from '../../2-view/components/fOptions';
export const AppContext = createContext<{ user: User | null }>({ user: null });

