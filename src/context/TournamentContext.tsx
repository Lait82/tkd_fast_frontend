import { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Role, TournamentActions } from '@/types/enums';
import { getTournamentInfo } from '@/services/tournamentService';

type Tournament = {
  id: number;
  uuid: string;
  code: string;
  name: string | null;
  date_of_event: string | null;
  location: string | null;
  arena: string | null;
  inscriptions_deadline: string | null;
  description: string | null;
  date_of_finish: string | null;
  created_at: string;
  updated_at: string;
  organizer_uuid: string | null;
  role: Role[]; // 👈 este es el rol del usuario respecto al torneo
};

type TournamentContextType = {
  tournament: Tournament | null;
  isLoading: boolean;
  hasRole: (role: Role) => boolean;
  can: (action: TournamentActions) => boolean;
};

const TournamentContext = createContext<TournamentContextType | undefined>(undefined);

export const TournamentProvider = ({ children }: { children: React.ReactNode }) => {
  const { tournamentCode } = useParams();
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!tournamentCode) return;

    const loadTournament = (tournamentCode: string) : Tournament | null => {
        let tournamentInfo: Tournament | null = null;

        const cached = localStorage.getItem(`tournament:${tournamentCode}`);
        if (cached) {
            tournamentInfo = JSON.parse(cached) as Tournament;
        }
        return tournamentInfo
    }

    const fetchTournament = async () => {
      try {
        // const res = await axios.get(`/api/tournaments/${tournamentCode}`);
        const cachedTournament = loadTournament(tournamentCode)
        let tournamentInfoRes = null;
        if(!cachedTournament){
            const tournamentInfoRes = await getTournamentInfo(tournamentCode);
            localStorage.setItem(`tournament:${tournamentCode}`, JSON.stringify(tournamentInfoRes));
        }
        setTournament(tournamentInfoRes);
      } catch (err) {
        console.error('Error fetching tournament', err);
        setTournament(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTournament();
  }, [tournamentCode]);

  const hasRole = (targetRole: Role): boolean => {
    return tournament?.role?.includes(targetRole) ?? false;
  };

  const can = (action: string): boolean => {
    if (!tournament) return false;

    const policy: Record<string, Role[]> = {
        editCategories: ['ORGANIZER'],
        editCompetitors: ['ORGANIZER'],
        editTournament: ['ORGANIZER'],
        
        inviteInstructor: ['ORGANIZER', 'MASTER'],
        inviteMaster: ['ORGANIZER'],
        
        enroll: ['ORGANIZER', 'INSTRUCTOR', 'MASTER'],
        view: ['ORGANIZER', 'INSTRUCTOR', 'NONE', 'COMPETITOR', 'MASTER'],
    };

    return policy[action]?.some((r) => hasRole(r)) ?? false;
  };

  return (
    <TournamentContext.Provider value={{ tournament, isLoading, hasRole, can }}>
      {children}
    </TournamentContext.Provider>
  );
};

export const useTournament = () => {
  const ctx = useContext(TournamentContext);
  if (!ctx) throw new Error('useTournament must be used within a TournamentProvider');
  return ctx;
};