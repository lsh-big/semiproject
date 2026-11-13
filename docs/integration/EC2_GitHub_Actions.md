# GitHub Actions를 이용한 EC2 배포

`Deploy ONFIT to EC2`는 `main` 브랜치에서 수동 실행한다. 선택한 커밋을
EC2로 전송해 `Dockerfile.ajb` 이미지를 빌드하고, 후보 컨테이너의 `/health`와
DB 연결을 확인한 다음 기존 ONFIT 컨테이너를 교체한다. 실패 시 기존 컨테이너를
복원하려고 시도한다. `/health`와 DB 연결만으로 회원가입 등 모든 기능을 검증하지는
않는다.

## 사전 준비

- EC2에서 Docker, curl이 동작하고 SSH 사용자에게 Docker 실행 권한이 있어야 한다.
  포트 18000과 18001은 로컬에서만 사용한다. GitHub 호스티드 러너에서 EC2의
  SSH 포트에 접근할 수 있어야 하며 보안 그룹은 조직 정책에 맞게 설정한다.
- 서버의 `~/.config/onfit/backend.env`에 `APP_ENV`, `SECRET_KEY`, `TIDB_HOST`,
  `TIDB_PORT`, `TIDB_USERNAME`, `TIDB_PASSWORD`, `TIDB_DATABASE`를 각각 한 번씩,
  비어 있지 않게 설정한다. DB는 기존 데이터를 공유할 수 있으므로 소유자 승인을
  받고, 노출된 자격 증명은 교체한다. 비밀값은 Git이나 워크플로 로그에 넣지 않는다.
- 이 워크플로는 DB 스키마나 환경 파일을 수정하지 않는다. 회원가입 이메일 발송,
  관리자 설정, 누락된 테이블, 이미지 OCR 등은 별도 준비와 검증이 필요하다.
- Nginx의 HTTPS 설정은 자동으로 변경하지 않는다. 관리자가 기존 인증서 설정을
  보존하면서 도메인 요청을 `http://127.0.0.1:18000`으로 프록시하고 설정 검증
  후 재로드해야 공개 사이트가 연결된다.
- 이미 `onfit`이라는 이름의 컨테이너가 있으면, 이 워크플로가 생성한 컨테이너가
  아닌 한 덮어쓰지 않는다. `onfit-candidate` 또는 `onfit-previous`가 남아 있으면
  원인을 확인한 뒤 관리자가 처리해야 한다.

## GitHub 환경 설정

저장소의 **Settings → Environments**에서 `ec2` 환경을 만들고, 해당 환경에
아래 Secrets를 등록한다. 브랜치 제한과 승인 규칙은 필요에 따라 설정한다.

| Secret | 설명 |
| --- | --- |
| `EC2_HOST` | SSH 접속 도메인 또는 IP |
| `EC2_USER` | SSH 사용자 이름 (예: `ubuntu`) |
| `EC2_SSH_KEY` | 해당 사용자 접속용 개인키 전체. 암호가 없는 배포 전용 키를 권장 |
| `EC2_KNOWN_HOSTS` | 신뢰한 EC2 SSH 호스트 키의 known_hosts 한 줄 |

기존 키를 재사용하기보다 필요한 범위로 제한된 배포 전용 접근을 권장한다. SSH
키 등록이나 보안 그룹 변경은 관리자가 직접 승인하고 수행한다. 개인키와 DB
비밀번호는 채팅, 저장소, 워크플로 로그에 노출하지 않는다.

`EC2_KNOWN_HOSTS`에는 신뢰할 수 있는 경로로 확인한 서버의 공개 호스트 키를
사용한다. 예를 들어 EC2 콘솔에서 서버 호스트 공개키의 지문을
`ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub`으로 확인한 후,
`EC2_HOST`와 같은 호스트명 또는 IP 뒤에 해당 공개키의 `ssh-ed25519 ...` 부분을
공백으로 이어 저장한다. 공개키 내용은 서버의
`/etc/ssh/ssh_host_ed25519_key.pub`에서 확인할 수 있다. 확인되지 않은
`ssh-keyscan` 결과를 그대로 신뢰하지 않는다.

## 실행

변경을 `main`에 반영한 뒤 GitHub의 **Actions → Deploy ONFIT to EC2 → Run
workflow**에서 `main`을 선택한다. 성공 후 공개 주소의 화면, `/health`, 로그인과
필요한 기능을 각각 확인한다. 워크플로 성공은 Nginx 연결 또는 모든 기능의 성공을
의미하지 않는다.

EC2의 메모리가 작으면 Docker 빌드가 느리거나 실패할 수 있다. 배포 도중 강제
중단되면 후보나 이전 컨테이너가 남을 수 있으므로 서버 상태를 먼저 확인한다.
