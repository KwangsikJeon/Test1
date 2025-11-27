"use client";

import { useState } from 'react';

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

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
