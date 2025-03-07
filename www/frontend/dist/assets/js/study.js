document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const files = document.getElementById('fileInput').files;
    const formData = new FormData();
    
    // 添加多个文件
    for (let file of files) {
      // 文件类型验证
      if (!file.type.startsWith('image/')) {
        alert('仅支持图片文件');
        return;
      }
      formData.append('files', file);
    }
  
    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
        headers: {
          // 不要手动设置Content-Type，浏览器会自动处理
        }
      });
  
      const result = await response.json();
      console.log('上传成功:', result);
    } catch (error) {
      console.error('上传失败:', error);
    }
  });












function uploadFile() {
    var fileInput = document.getElementById('fileUpload');
    var file = fileInput.files[0];
    var formData = new FormData();
    formData.append('file', file);
    fetch('/upload.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

