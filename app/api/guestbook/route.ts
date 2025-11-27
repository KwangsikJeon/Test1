import { NextRequest, NextResponse } from 'next/server';
import { getGuestbookEntries, addGuestbookEntry, getTotalCount } from '../../lib/guestbook-data';

// GET /api/guestbook - 방명록 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    // 현재 사용자 IP 가져오기
    const currentUserIP = request.headers.get('x-forwarded-for') ||
                         request.headers.get('x-real-ip') ||
                         'unknown';

    const paginatedEntries = getGuestbookEntries(limit, offset);

    // 각 항목에 대해 현재 사용자가 좋아요했는지 여부 추가
    const entriesWithLikeStatus = paginatedEntries.map(entry => ({
      ...entry,
      isLikedByCurrentUser: entry.likedBy.includes(currentUserIP)
    }));

    return NextResponse.json({
      success: true,
      data: entriesWithLikeStatus,
      total: getTotalCount(),
      limit,
      offset,
      currentUserIP,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('방명록 조회 오류:', error);
    return NextResponse.json(
      {
        success: false,
        error: '방명록을 불러오는데 실패했습니다.',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// POST /api/guestbook - 새 방명록 추가
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { author, message } = body;

    // 입력 검증
    if (!author || !message) {
      return NextResponse.json(
        {
          success: false,
          error: '작성자와 메시지를 모두 입력해주세요.',
          timestamp: new Date().toISOString()
        },
        { status: 400 }
      );
    }

    if (author.length > 50) {
      return NextResponse.json(
        {
          success: false,
          error: '작성자 이름은 50자 이하로 입력해주세요.',
          timestamp: new Date().toISOString()
        },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        {
          success: false,
          error: '메시지는 500자 이하로 입력해주세요.',
          timestamp: new Date().toISOString()
        },
        { status: 400 }
      );
    }

    // 기본적인 스팸 방지 (같은 IP에서 너무 자주 작성하는 것 방지)
    const clientIP = request.headers.get('x-forwarded-for') ||
                    request.headers.get('x-real-ip') ||
                    'unknown';

    // 최근 1분간 같은 IP에서 작성한 글 수 확인 (간단한 스팸 방지)
    const allEntries = getGuestbookEntries(); // 전체 데이터 가져오기
    const recentEntries = allEntries.filter(entry =>
      entry.ip === clientIP &&
      new Date().getTime() - new Date(entry.createdAt).getTime() < 60000 // 1분
    );

    if (recentEntries.length >= 3) {
      return NextResponse.json(
        {
          success: false,
          error: '잠시 후 다시 시도해주세요.',
          timestamp: new Date().toISOString()
        },
        { status: 429 }
      );
    }

    // 새 방명록 추가
    const newEntry = addGuestbookEntry(author, message, clientIP);

    return NextResponse.json({
      success: true,
      data: newEntry,
      message: '방명록이 성공적으로 등록되었습니다.',
      timestamp: new Date().toISOString()
    }, { status: 201 });

  } catch (error) {
    console.error('방명록 추가 오류:', error);
    return NextResponse.json(
      {
        success: false,
        error: '방명록 등록에 실패했습니다.',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
