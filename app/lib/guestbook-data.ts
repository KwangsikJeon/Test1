// 공통 방명록 데이터 저장소
// 실제 프로덕션에서는 데이터베이스를 사용하세요

export interface GuestbookEntry {
  id: number;
  author: string;
  message: string;
  createdAt: string;
  ip?: string;
  likes: number;
  likedBy: string[];
}

import fs from 'fs';
import path from 'path';

// 파일 기반 데이터 저장소 (JSON 파일 사용)
const DATA_FILE = path.join(process.cwd(), 'data', 'guestbook.json');

// 데이터 디렉토리 생성
const ensureDataDir = () => {
  const dataDir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// 데이터 로드
const loadData = (): { entries: GuestbookEntry[]; nextId: number } => {
  try {
    ensureDataDir();
    if (fs.existsSync(DATA_FILE)) {
      const rawData = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsedData = JSON.parse(rawData);

      // 데이터 마이그레이션: likes와 likedBy 필드 추가
      if (parsedData.entries) {
        parsedData.entries = parsedData.entries.map((entry: any) => ({
          ...entry,
          likes: entry.likes || 0,
          likedBy: entry.likedBy || []
        }));
      }

      return parsedData;
    }
  } catch (error) {
    console.error('데이터 로드 실패:', error);
  }

  // 기본 데이터
  return {
    entries: [
      {
        id: 1,
        author: "개발자 A",
        message: "멋진 포트폴리오네요! 앞으로도 좋은 프로젝트 많이 만들어보세요!",
        createdAt: "2024-11-27T10:00:00.000Z",
        likes: 3,
        likedBy: ["192.168.1.1", "192.168.1.2", "192.168.1.3"]
      },
      {
        id: 2,
        author: "디자이너 B",
        message: "UI/UX가 정말 깔끔하고 직관적이에요. 협업하고 싶습니다!",
        createdAt: "2024-11-26T15:30:00.000Z",
        likes: 5,
        likedBy: ["192.168.1.4", "192.168.1.5", "192.168.1.6", "192.168.1.7", "192.168.1.8"]
      },
      {
        id: 3,
        author: "PM C",
        message: "기술 스택도 적절하고, 코드 퀄리티가 좋아보입니다. 좋은 인재네요!",
        createdAt: "2024-11-25T09:15:00.000Z",
        likes: 2,
        likedBy: ["192.168.1.9", "192.168.1.10"]
      }
    ],
    nextId: 4
  };
};

// 데이터 저장
const saveData = (data: { entries: GuestbookEntry[]; nextId: number }) => {
  try {
    ensureDataDir();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('데이터 저장 실패:', error);
    throw error;
  }
};

// 데이터 관리
let data = loadData();

// 데이터 관리 함수들
export const getGuestbookEntries = (limit?: number, offset?: number): GuestbookEntry[] => {
  data = loadData(); // 최신 데이터 로드
  const sorted = [...data.entries].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (limit && offset !== undefined) {
    return sorted.slice(offset, offset + limit);
  }

  return sorted;
};

export const getGuestbookEntry = (id: number): GuestbookEntry | undefined => {
  data = loadData(); // 최신 데이터 로드
  return data.entries.find(entry => entry.id === id);
};

export const addGuestbookEntry = (author: string, message: string, ip?: string): GuestbookEntry => {
  data = loadData(); // 최신 데이터 로드

  const newEntry: GuestbookEntry = {
    id: data.nextId++,
    author: author.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString(),
    ip,
    likes: 0,
    likedBy: []
  };

  data.entries.push(newEntry);
  saveData(data); // 변경사항 저장
  return newEntry;
};

export const deleteGuestbookEntry = (id: number): GuestbookEntry | null => {
  data = loadData(); // 최신 데이터 로드
  const index = data.entries.findIndex(entry => entry.id === id);
  if (index === -1) return null;

  const deletedEntry = data.entries.splice(index, 1)[0];
  saveData(data); // 변경사항 저장
  return deletedEntry;
};

export const toggleLike = (id: number, userIP: string): { success: boolean; likes: number; isLiked: boolean } => {
  data = loadData(); // 최신 데이터 로드
  const entryIndex = data.entries.findIndex(entry => entry.id === id);

  if (entryIndex === -1) {
    return { success: false, likes: 0, isLiked: false };
  }

  const entry = data.entries[entryIndex];
  const isLiked = entry.likedBy.includes(userIP);

  if (isLiked) {
    // 좋아요 취소
    entry.likes--;
    entry.likedBy = entry.likedBy.filter(ip => ip !== userIP);
  } else {
    // 좋아요 추가
    entry.likes++;
    entry.likedBy.push(userIP);
  }

  saveData(data); // 변경사항 저장
  return { success: true, likes: entry.likes, isLiked: !isLiked };
};

export const getTotalCount = (): number => {
  data = loadData(); // 최신 데이터 로드
  return data.entries.length;
};

// 개발용 함수 (실제 서비스에서는 제거)
export const resetGuestbookData = (): void => {
  guestbookEntries = [
    {
      id: 1,
      author: "개발자 A",
      message: "멋진 포트폴리오네요! 앞으로도 좋은 프로젝트 많이 만들어보세요!",
      createdAt: "2024-11-27T10:00:00.000Z"
    },
    {
      id: 2,
      author: "디자이너 B",
      message: "UI/UX가 정말 깔끔하고 직관적이에요. 협업하고 싶습니다!",
      createdAt: "2024-11-26T15:30:00.000Z"
    },
    {
      id: 3,
      author: "PM C",
      message: "기술 스택도 적절하고, 코드 퀄리티가 좋아보입니다. 좋은 인재네요!",
      createdAt: "2024-11-25T09:15:00.000Z"
    }
  ];
  nextId = 4;
};
