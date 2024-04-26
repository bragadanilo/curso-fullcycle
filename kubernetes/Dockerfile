FROM golang:1.15

COPY . .

RUN go build -o server .

CMD ["./server"]

# docker build -t danilobraga/hello-go .

# docker run --rm -p 8080:8080 danilobraga/hello-go