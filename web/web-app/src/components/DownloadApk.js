import React, { useState } from "react";
import {Link} from 'react-router-dom'

export default function DownloadApk() {
    function download(url) {
        const a = document.createElement('a')
        a.href = url
        a.download = url.split('/').pop()
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      };
    return (
        download("app-release.apk")
    )
}