FROM jrottenberg/ffmpeg

ENV RUNTIME_FOLDER /root/work/video-svc
WORKDIR /root/work

RUN apt-get -yqq update && \
    apt-get install -yq --no-install-recommends build-essential apt-transport-https lsb-release ca-certificates curl && \
    curl -sL https://deb.nodesource.com/setup_12.x | bash && \
    apt-get install -yq nodejs && \
    npm install -g yarn

COPY video-svc ${RUNTIME_FOLDER}
COPY run_docker_process.sh .

EXPOSE 9999

ENTRYPOINT [ "/bin/bash" ]

CMD [ "run_docker_process.sh" ]