FROM golang:1.21-alpine AS builder

WORKDIR /app

COPY ./hello.go .

RUN go mod init danilobraga/hello && go build


FROM scratch

COPY --from=builder /app /app

CMD ["./app/hello"]
