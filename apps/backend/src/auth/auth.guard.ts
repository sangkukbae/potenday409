import { ExecutionContext, Injectable } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"

@Injectable()
export class GoogleAuthGuard extends AuthGuard("google") {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean
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

export class JwtGuard extends AuthGuard("jwt") {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    return (await super.canActivate(context)) as boolean
  }
}
