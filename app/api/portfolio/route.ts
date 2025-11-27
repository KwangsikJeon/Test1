import { NextResponse } from 'next/server';

interface Project {
  id: number;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  technologies: string[];
  period: string;
  role: string;
  features: string[];
  links: { github?: string; demo?: string };
  screenshots?: string[];
}

interface Skill {
  category: string;
  technologies: string[];
}

interface Profile {
  name: string;
  title: string;
  description: string;
  image: string;
  email: string;
  github: string;
  location: string;
  experience: string;
}

interface PortfolioData {
  profile: Profile;
  projects: Project[];
  skills: Skill[];
  contact: {
    email: string;
    github: string;
  };
}

// 포트폴리오 데이터
const portfolioData: PortfolioData = {
  profile: {
    name: "바잌브 코딩",
    title: "프론트엔드 개발자",
    description: "React, Next.js, TypeScript를 활용하여 사용자 경험을 중요시하는 웹 애플리케이션을 개발합니다. 코드로 세상을 더 나아지게 만드는 것을 목표로 합니다.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    email: "contact@example.com",
    github: "https://github.com",
    location: "서울",
    experience: "신입"
  },
  projects: [
    {
      id: 1,
      title: "포트폴리오 웹사이트",
      shortDesc: "Next.js와 Tailwind CSS를 활용한 반응형 포트폴리오 사이트입니다. 네이버블로그 스타일의 깔끔한 디자인을 적용했습니다.",
      fullDesc: "개인 포트폴리오를 위한 완전 반응형 웹사이트입니다. 네이버블로그의 깔끔한 디자인을 모티브로 하여 사용자 친화적인 인터페이스를 구현했습니다. TypeScript를 활용한 타입 안정성과 Tailwind CSS의 유틸리티 클래스로 효율적인 스타일링을 적용했습니다.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      period: "2024.11",
      role: "프론트엔드 개발자",
      features: [
        "완전 반응형 디자인",
        "네이버블로그 스타일 UI",
        "프로젝트 상세 모달",
        "다크모드 지원",
        "SEO 최적화"
      ],
      links: {
        github: "https://github.com",
        demo: "https://example.com"
      },
      screenshots: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop"
      ]
    },
    {
      id: 2,
      title: "할 일 관리 앱",
      shortDesc: "React와 상태 관리를 활용한 간단한 할 일 관리 애플리케이션입니다. CRUD 기능을 구현하여 실무 경험을 쌓았습니다.",
      fullDesc: "현대적인 할 일 관리 애플리케이션입니다. React의 useState와 useEffect를 활용한 상태 관리, 로컬 스토리지를 통한 데이터 영속성, 그리고 직관적인 UI/UX를 구현했습니다. 실제 사용자들이 사용할 수 있는 완성도 높은 웹 애플리케이션입니다.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
      technologies: ["React", "JavaScript", "CSS", "Local Storage"],
      period: "2024.09 - 2024.10",
      role: "프론트엔드 개발자",
      features: [
        "할 일 추가/수정/삭제",
        "완료 상태 토글",
        "데이터 영속성 (Local Storage)",
        "반응형 디자인",
        "직관적인 사용자 인터페이스"
      ],
      links: {
        github: "https://github.com",
        demo: "https://example.com"
      }
    },
    {
      id: 3,
      title: "블로그 플랫폼",
      shortDesc: "개인 블로그를 위한 콘텐츠 관리 시스템입니다. MDX를 활용한 마크다운 기반의 블로그 플랫폼입니다.",
      fullDesc: "콘텐츠 크리에이터를 위한 모던한 블로그 플랫폼입니다. MDX를 활용하여 마크다운으로 콘텐츠를 작성할 수 있으며, Next.js의 SSG를 통해 뛰어난 성능을 제공합니다. SEO 최적화와 빠른 로딩 속도를 자랑합니다.",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
      technologies: ["Next.js", "MDX", "Vercel", "TypeScript"],
      period: "2024.08 - 2024.09",
      role: "풀스택 개발자",
      features: [
        "MDX 기반 콘텐츠 작성",
        "SSG를 통한 고성능",
        "SEO 최적화",
        "반응형 디자인",
        "빠른 배포 (Vercel)"
      ],
      links: {
        github: "https://github.com",
        demo: "https://example.com"
      }
    }
  ],
  skills: [
    {
      category: "프론트엔드",
      technologies: ["React", "Next.js", "TypeScript", "JavaScript"]
    },
    {
      category: "스타일링",
      technologies: ["Tailwind CSS", "CSS3", "SASS"]
    },
    {
      category: "도구 & 협업",
      technologies: ["Git", "VS Code", "Figma"]
    },
    {
      category: "기타",
      technologies: ["Node.js", "REST API", "Vercel"]
    }
  ],
  contact: {
    email: "contact@example.com",
    github: "https://github.com"
  }
};

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: portfolioData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: '포트폴리오 데이터를 불러오는데 실패했습니다.',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
