import { NextRequest, NextResponse } from 'next/server';
import { toggleLike } from '../../../../lib/guestbook-data';

// POST /api/guestbook/[id]/like - 방명록 좋아요 토글
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json(
        {
          success: false,
          error: '유효하지 않은 ID입니다.',
          timestamp: new Date().toISOString()
        },
        { status: 400 }
      );
    }

    // 사용자 IP 가져오기
    const userIP = request.headers.get('x-forwarded-for') ||
                  request.headers.get('x-real-ip') ||
                  'unknown';

    // 좋아요 토글 실행
    const result = toggleLike(id, userIP);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: '해당 방명록을 찾을 수 없습니다.',
          timestamp: new Date().toISOString()
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        likes: result.likes,
        isLiked: result.isLiked
      },
      message: result.isLiked ? '좋아요를 추가했습니다.' : '좋아요를 취소했습니다.',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('좋아요 토글 오류:', error);
    return NextResponse.json(
      {
        success: false,
        error: '좋아요 처리에 실패했습니다.',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
