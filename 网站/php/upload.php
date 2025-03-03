<?php
if(isset($_FILES['file'])){
    $file = $_FILES['file'];
    $fileName = $file['name'];
    $fileTmpName = $file['tmp_name'];
    $fileSize = $file['size'];
    $fileError = $file['error'];
    $fileType = $file['type'];
    $fileExt = pathinfo($fileName, PATHINFO_EXTENSION);
    
    // 检查文件类型和大小
    if ($fileError === UPLOAD_ERR_OK && $fileSize > 0 && is_string($fileExt)) {
        // 将文件从临时目录移动到目标目录（这里是images目录）
        move_uploaded_file($fileTmpName, 'images/' . $fileName);
        echo '文件上传成功！';
    } else {
        echo '文件类型或大小不正确！';
    }
} else {
    echo '没有选择文件！';
}
?>
