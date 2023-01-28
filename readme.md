# Правила и полезности

1. Главная ветка - main
2. Запрещено пушить сразу в main
3. Каждый пушит только в свою ветку !
4. Все свои ветки делаются из ветки MAIN
5. Перед каждым коммитом нужно стягивать возможно обновленные данные с репозитория `git pull`

## Процесс работы:

1. Клонируете себе на ком репозиторий: `git clone https://github.com/Andrgoit/petly-backend.git`
2. Создать и перейти в свою ветку `git checkout -b "feature/название ветки"`
3. Сохранить коммит `git add .` и `git commit -m "название коммита"`
4. Перейти в ветку main `git checkout main`
5. Стянуть последние изменения `git pull`
6. Если нет конфликтов, выполнить пуш `git push`
7. После этого появится сообщение, что такой ветки не существует на Гит Хабе и предложат скопировать длинный код. Копируете, вставляете и запускаете.
8. Перейти на Гит Хаб и оформить Pull Request

- если я не ошибся, то будет все нормально))))

Если нужно внести изменения, то из ветки MAIN создается ветка `git checkout -b "fix/название ветки"`

### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)