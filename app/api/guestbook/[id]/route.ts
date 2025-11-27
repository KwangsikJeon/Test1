import { NextRequest, NextResponse } from 'next/server';
import { getGuestbookEntry, deleteGuestbookEntry } from '../../../lib/guestbook-data';

// DELETE /api/guestbook/[id] - 특정 방명록 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    console.log('DELETE 요청 받은 params:', resolvedParams);
    console.log('params.id 값:', resolvedParams.id, '타입:', typeof resolvedParams.id);

    const id = parseInt(resolvedParams.id);
    console.log('파싱된 ID:', id, 'isNaN 결과:', isNaN(id));

    if (isNaN(id)) {
      console.log('ID 파싱 실패 - 유효하지 않은 ID');
      return NextResponse.json(
        {
          success: false,
          error: '유효하지 않은 ID입니다.',
          timestamp: new Date().toISOString()
        },
        { status: 400 }
      );
    }

    // 방명록 찾기
    const entryToDelete = getGuestbookEntry(id);

    if (!entryToDelete) {
      return NextResponse.json(
        {
          success: false,
          error: '해당 방명록을 찾을 수 없습니다.',
          timestamp: new Date().toISOString()
        },
        { status: 404 }
      );
    }

    // 방명록 삭제
    const deletedEntry = deleteGuestbookEntry(id);

    return NextResponse.json({
      success: true,
      data: deletedEntry,
      message: '방명록이 성공적으로 삭제되었습니다.',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('방명록 삭제 오류:', error);
    return NextResponse.json(
      {
        success: false,
        error: '방명록 삭제에 실패했습니다.',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// GET /api/guestbook/[id] - 특정 방명록 조회 (선택사항)
export async function GET(
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

    const entry = getGuestbookEntry(id);

    if (!entry) {
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
      data: entry,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('방명록 조회 오류:', error);
    return NextResponse.json(
      {
        success: false,
        error: '방명록 조회에 실패했습니다.',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
