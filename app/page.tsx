"use client";

import { useState, useEffect } from 'react';

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

interface GuestbookEntry {
  id: number;
  author: string;
  message: string;
  createdAt: string;
}

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [guestbookEntries, setGuestbookEntries] = useState<GuestbookEntry[]>([]);
  const [newGuestbook, setNewGuestbook] = useState({ author: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [guestbookError, setGuestbookError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  // 방명록 데이터 로드
  useEffect(() => {
    fetchGuestbook();
  }, []);

  const fetchGuestbook = async () => {
    try {
      const response = await fetch('/api/guestbook');
      const data = await response.json();
      if (data.success) {
        setGuestbookEntries(data.data);
      }
    } catch (error) {
      console.error('방명록 로드 실패:', error);
    }
  };

  const handleGuestbookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestbook.author.trim() || !newGuestbook.message.trim()) {
      setGuestbookError('이름과 메시지를 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    setGuestbookError('');

    try {
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGuestbook),
      });

      const data = await response.json();

      if (data.success) {
        setNewGuestbook({ author: '', message: '' });
        await fetchGuestbook(); // 목록 새로고침
      } else {
        setGuestbookError(data.error || '방명록 등록에 실패했습니다.');
      }
    } catch (error) {
      setGuestbookError('네트워크 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteGuestbook = async (id: number) => {
    try {
      console.log('프론트엔드 삭제 요청 - ID:', id, '타입:', typeof id);
      const url = `/api/guestbook/${id}`;
      console.log('요청 URL:', url);

      const response = await fetch(url, {
        method: 'DELETE',
      });

      console.log('응답 상태:', response.status);

      const data = await response.json();
      console.log('응답 데이터:', data);

      if (data.success) {
        console.log('삭제 성공');
        await fetchGuestbook(); // 목록 새로고침
        setDeleteConfirm(null); // 확인 모달 닫기
      } else {
        console.error('삭제 실패:', data.error);
        alert('삭제에 실패했습니다: ' + data.error);
      }
    } catch (error) {
      console.error('네트워크 오류:', error);
      alert('네트워크 오류가 발생했습니다.');
    }
  };

  const projects: Project[] = [
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
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* 네이버블로그 스타일 헤더 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* 로고 */}
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-800">바잌브 코딩</h1>
            </div>

            {/* 네비게이션 메뉴 */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-600 hover:text-green-600 font-medium transition-colors">소개</a>
              <a href="#projects" className="text-gray-600 hover:text-green-600 font-medium transition-colors">프로젝트</a>
              <a href="#skills" className="text-gray-600 hover:text-green-600 font-medium transition-colors">스킬</a>
              <a href="#guestbook" className="text-gray-600 hover:text-green-600 font-medium transition-colors">방명록</a>
              <a href="#contact" className="text-gray-600 hover:text-green-600 font-medium transition-colors">연락처</a>
            </nav>

            {/* 모바일 메뉴 버튼 */}
            <button className="md:hidden p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 메인 콘텐츠 영역 */}
          <main className="flex-1">
            {/* 프로필 카드 */}
            <section className="naver-card p-8 mb-8">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full border-4 border-white shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                    alt="프로필 사진"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">안녕하세요! 바잌브 코딩입니다</h1>
                <p className="text-gray-600 mb-6">프론트엔드 개발자</p>
                <p className="text-gray-700 leading-relaxed">
                  React, Next.js, TypeScript를 활용하여 사용자 경험을 중요시하는 웹 애플리케이션을 개발합니다.<br />
                  코드로 세상을 더 나아지게 만드는 것을 목표로 합니다.
                </p>
                <div className="flex justify-center space-x-4 mt-6">
                  <a href="#projects" className="naver-button">프로젝트 보기</a>
                  <a href="#contact" className="naver-button-secondary">연락하기</a>
                </div>
              </div>
            </section>

            {/* 소개 섹션 */}
            <section id="about" className="naver-section">
              <div className="naver-card p-6">
                <h2 className="naver-title">소개</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    저는 사용자 중심의 웹 개발을 추구하는 프론트엔드 개발자입니다.
                    최신 기술을 활용하여 직관적이고 효율적인 사용자 인터페이스를 만들어내는 것을 즐깁니다.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    새로운 기술을 배우고 적용하는 과정에서 큰 만족감을 느끼며,
                    항상 더 나은 사용자 경험을 위해 고민하고 개선해나가는 개발자입니다.
                  </p>
                </div>
              </div>
            </section>

            {/* 프로젝트 섹션 */}
            <section id="projects" className="naver-section">
              <div className="naver-card p-6">
                <h2 className="naver-title">프로젝트</h2>
                <p className="naver-subtitle">
                  최근 작업한 프로젝트들입니다. 각 프로젝트는 저의 성장과 기술적 역량을 보여줍니다.
                </p>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all cursor-pointer hover:border-green-300"
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-lg text-gray-800 mb-2">{project.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                          {project.shortDesc}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, index) => {
                            const colors = [
                              'bg-green-100 text-green-800',
                              'bg-blue-100 text-blue-800',
                              'bg-purple-100 text-purple-800',
                              'bg-yellow-100 text-yellow-800',
                              'bg-pink-100 text-pink-800',
                              'bg-orange-100 text-orange-800'
                            ];
                            return (
                              <span
                                key={index}
                                className={`${colors[index % colors.length]} px-2 py-1 rounded text-xs font-medium`}
                              >
                                {tech}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 스킬 섹션 */}
            <section id="skills" className="naver-section">
              <div className="naver-card p-6">
                <h2 className="naver-title">스킬</h2>
                <p className="naver-subtitle">
                  주로 사용하는 기술 스택과 도구들입니다.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">프론트엔드</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">React</span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Next.js</span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">TypeScript</span>
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">JavaScript</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">스타일링</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-medium">Tailwind CSS</span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">CSS3</span>
                      <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">SASS</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">도구 & 협업</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">Git</span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">VS Code</span>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Figma</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">기타</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Node.js</span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">REST API</span>
                      <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">Vercel</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

        {/* 방명록 섹션 */}
        <section id="guestbook" className="naver-section">
          <div className="naver-card p-6">
            <h2 className="naver-title">방명록</h2>
            <p className="naver-subtitle">
              방문해주셔서 감사합니다! 응원 메시지나 피드백을 남겨주세요.
            </p>

            {/* 방명록 작성 폼 */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-gray-800 mb-4">메시지 남기기</h3>
              <form onSubmit={handleGuestbookSubmit} className="space-y-4">
                <div>
                  <label htmlFor="guestbook-author" className="block text-sm font-medium text-gray-700 mb-1">
                    이름
                  </label>
                  <input
                    id="guestbook-author"
                    type="text"
                    value={newGuestbook.author}
                    onChange={(e) => setNewGuestbook(prev => ({ ...prev, author: e.target.value }))}
                    placeholder="이름을 입력하세요"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    maxLength={50}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="guestbook-message" className="block text-sm font-medium text-gray-700 mb-1">
                    메시지
                  </label>
                  <textarea
                    id="guestbook-message"
                    value={newGuestbook.message}
                    onChange={(e) => setNewGuestbook(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="응원 메시지나 피드백을 남겨주세요"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    maxLength={500}
                    required
                  />
                </div>
                {guestbookError && (
                  <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                    {guestbookError}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`naver-button inline-flex items-center justify-center w-full sm:w-auto ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      등록 중...
                    </>
                  ) : (
                    <>
                      ✍️ 메시지 남기기
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* 방명록 목록 */}
            <div>
              <h3 className="font-bold text-gray-800 mb-4">방명록 ({guestbookEntries.length})</h3>
              {guestbookEntries.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  아직 방명록이 없습니다. 첫 번째 메시지를 남겨보세요! 😊
                </div>
              ) : (
                <div className="space-y-4">
                  {guestbookEntries.map((entry) => (
                    <div key={entry.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow relative group">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-gray-800">{entry.author}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">
                            {new Date(entry.createdAt).toLocaleDateString('ko-KR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                          <button
                            onClick={() => setDeleteConfirm(entry.id)}
                            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-200 p-1 rounded hover:bg-red-50"
                            title="삭제"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{entry.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 연락처 섹션 */}
        <section id="contact" className="naver-section">
          <div className="naver-card p-6">
            <h2 className="naver-title">연락처</h2>
            <p className="naver-subtitle">
              프로젝트 협업이나 질문이 있으시면 언제든 연락주세요.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="mailto:contact@example.com" className="naver-button inline-flex items-center justify-center">
                📧 이메일 보내기
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="naver-button-secondary inline-flex items-center justify-center">
                💻 GitHub 방문
              </a>
            </div>
          </div>
        </section>
          </main>

          {/* 사이드바 */}
          <aside className="lg:w-80">
            <div className="sticky top-24 space-y-6">
              {/* 프로필 요약 */}
              <div className="naver-card p-6">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-3 overflow-hidden rounded-full border-2 border-gray-200">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
                      alt="프로필 사진"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1">바잌브 코딩</h3>
                  <p className="text-sm text-gray-600">프론트엔드 개발자</p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">경력</span>
                      <span className="font-medium">신입</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">주요 기술</span>
                      <span className="font-medium">React/Next.js</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">위치</span>
                      <span className="font-medium">서울</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 카테고리 */}
              <div className="naver-card p-6">
                <h3 className="font-bold text-gray-800 mb-4">카테고리</h3>
                <nav className="space-y-2">
                  <a href="#about" className="block text-gray-600 hover:text-green-600 transition-colors">📖 소개</a>
                  <a href="#projects" className="block text-gray-600 hover:text-green-600 transition-colors">💼 프로젝트</a>
                  <a href="#skills" className="block text-gray-600 hover:text-green-600 transition-colors">🛠️ 스킬</a>
                  <a href="#guestbook" className="block text-gray-600 hover:text-green-600 transition-colors">📝 방명록</a>
                  <a href="#contact" className="block text-gray-600 hover:text-green-600 transition-colors">📧 연락처</a>
                </nav>
              </div>

              {/* 최근 활동 */}
              <div className="naver-card p-6">
                <h3 className="font-bold text-gray-800 mb-4">최근 활동</h3>
                <div className="space-y-3">
                  <div className="text-sm">
                    <p className="text-gray-600">포트폴리오 사이트 완성</p>
                    <span className="text-xs text-gray-500">2024.11</span>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-600">Next.js 학습 완료</p>
                    <span className="text-xs text-gray-500">2024.10</span>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-600">React 프로젝트 완료</p>
                    <span className="text-xs text-gray-500">2024.09</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* 프로젝트 상세 모달 */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">{selectedProject.title}</h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              {/* 메인 이미지 */}
              <div className="mb-6">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {/* 프로젝트 정보 */}
                <div className="md:col-span-2">
                  <h3 className="font-bold text-lg text-gray-800 mb-3">프로젝트 설명</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">{selectedProject.fullDesc}</p>

                  <h3 className="font-bold text-lg text-gray-800 mb-3">주요 기능</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                {/* 프로젝트 상세 정보 */}
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-3">프로젝트 정보</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">기간:</span>
                      <p className="text-gray-800">{selectedProject.period}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">역할:</span>
                      <p className="text-gray-800">{selectedProject.role}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">사용 기술:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedProject.technologies.map((tech, index) => {
                          const colors = [
                            'bg-green-100 text-green-800',
                            'bg-blue-100 text-blue-800',
                            'bg-purple-100 text-purple-800',
                            'bg-yellow-100 text-yellow-800',
                            'bg-pink-100 text-pink-800',
                            'bg-orange-100 text-orange-800'
                          ];
                          return (
                            <span
                              key={index}
                              className={`${colors[index % colors.length]} px-2 py-1 rounded text-xs font-medium`}
                            >
                              {tech}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* 링크들 */}
                  <div className="mt-6 space-y-2">
                    {selectedProject.links.github && (
                      <a
                        href={selectedProject.links.github}
            target="_blank"
            rel="noopener noreferrer"
                        className="naver-button-secondary inline-flex items-center justify-center w-full"
                      >
                        🐙 GitHub 보기
                      </a>
                    )}
                    {selectedProject.links.demo && (
                      <a
                        href={selectedProject.links.demo}
            target="_blank"
            rel="noopener noreferrer"
                        className="naver-button inline-flex items-center justify-center w-full"
                      >
                        🌐 Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* 스크린샷 갤러리 */}
              {selectedProject.screenshots && selectedProject.screenshots.length > 0 && (
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-3">스크린샷</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedProject.screenshots.map((screenshot, index) => (
                      <img
                        key={index}
                        src={screenshot}
                        alt={`${selectedProject.title} 스크린샷 ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 삭제 확인 모달 */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">방명록 삭제</h3>
              <p className="text-sm text-gray-500 mb-6">
                정말로 이 방명록을 삭제하시겠습니까?<br />
                삭제된 내용은 복구할 수 없습니다.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors font-medium"
                >
                  취소
                </button>
                <button
                  onClick={() => handleDeleteGuestbook(deleteConfirm)}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors font-medium"
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 푸터 */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600 text-sm">
            <p>© 2024 바잌브 코딩. 모든 권리 보유.</p>
            <p className="mt-2">Made with ❤️ using Next.js & Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
