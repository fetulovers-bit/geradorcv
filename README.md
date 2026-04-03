# Welcome to your Lovable project

## Auto commit/push

Foi adicionado um monitor para automatizar `git add`, `commit` e `push` sempre que houver alteração no repositório.

### Como usar

```bash
npm run auto:commit:push
```

Opcionalmente, você pode passar uma branch:

```bash
bash ./scripts/auto-commit-push.sh minha-branch
```

O script verifica mudanças periodicamente (3s por padrão) e cria commits no formato:

`chore: auto commit YYYY-MM-DD HH:MM:SS UTC`

Para alterar o intervalo de verificação:

```bash
INTERVAL_SECONDS=1 npm run auto:commit:push
```
