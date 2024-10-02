import { ExecutionContext, Injectable } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"

@Injectable()
export class GoogleAuthGuard extends AuthGuard("google") {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean // super.canActive에서 stategy의 validate함수를 실행 => 성공하면 serializer 실행
    // 컨텍스트에서 리퀘스트 객체를 꺼냄
    const request = context.switchToHttp().getRequest()
    await super.logIn(request) //세션 저장
    return result
  }
}

export class KakaoAuthGuard extends AuthGuard("kakao") {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean
    const request = context.switchToHttp().getRequest()
    await super.logIn(request)
    return result
  }
}
