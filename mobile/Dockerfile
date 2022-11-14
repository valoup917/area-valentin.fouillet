FROM cirrusci/flutter:latest

WORKDIR /mobile

COPY . ./

RUN flutter doctor -v
RUN rm -f .packages

RUN flutter pub get
RUN flutter clean

RUN flutter build apk --no-sound-null-safety

RUN mkdir /volumes/

RUN mv build/app/outputs/apk/release/app-release.apk /volumes/

CMD ["/bin/bash"]