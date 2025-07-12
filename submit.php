<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Form məlumatlarını topla
    $fullname = htmlspecialchars($_POST['fullname']);
    $phone = htmlspecialchars($_POST['phone']);
    $email = htmlspecialchars($_POST['email']);
    $main_field = htmlspecialchars($_POST['main_field']);
    $portfolio = htmlspecialchars($_POST['portfolio'] ?? '');
    
    // Çox seçimli sahələr
    $tools = isset($_POST['tools']) ? implode(", ", $_POST['tools']) : '';
    $work_type = isset($_POST['work_type']) ? implode(", ", $_POST['work_type']) : '';
    $site_type = isset($_POST['site_type']) ? implode(", ", $_POST['site_type']) : '';
    $video_type = isset($_POST['video_type']) ? implode(", ", $_POST['video_type']) : '';
    $specializations = isset($_POST['specialization']) ? implode(", ", $_POST['specialization']) : '';
    $delivery_format = isset($_POST['delivery_format']) ? implode(", ", $_POST['delivery_format']) : '';
    $delivery = isset($_POST['delivery']) ? implode(", ", $_POST['delivery']) : '';
    $skills = isset($_POST['skills']) ? implode(", ", $_POST['skills']) : '';
    
    // Email məzmunu
    $to = "yunisrehmanzada@gmail.com";
    $subject = "Virtual Craft Designers - Yeni Üzv Məlumatları";
    $message = "
    <html>
    <head>
        <title>Virtual Craft Designers - Yeni Üzv Məlumatları</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            h2 { color: #006064; }
            .info { margin-bottom: 10px; }
            .label { font-weight: bold; color: #006064; display: inline-block; width: 200px; }
            .section { margin-top: 20px; border-top: 1px solid #eee; padding-top: 10px; }
        </style>
    </head>
    <body>
        <h2>Virtual Craft Designers - Yeni Üzv Məlumatları</h2>
        
        <div class='info'><span class='label'>Ad Soyad:</span> $fullname</div>
        <div class='info'><span class='label'>Telefon:</span> $phone</div>
        <div class='info'><span class='label'>Email:</span> $email</div>
        <div class='info'><span class='label'>Əsas Sahə:</span> $main_field</div>
        
        <div class='section'>
            <h3>İxtisaslaşma Məlumatları</h3>
            <div class='info'><span class='label'>İstifadə olunan proqramlar:</span> $tools</div>
    ";
    
    // Sahəyə xüsusi məlumatlar
    switch($main_field) {
        case 'graphic_design':
            $message .= "
                <div class='info'><span class='label'>İş növü:</span> $work_type</div>
                <div class='info'><span class='label'>İxtisaslaşma:</span> $specializations</div>
                <div class='info'><span class='label'>Çatdırılma formatı:</span> $delivery_format</div>
            ";
            break;
            
        case 'web_design':
            $message .= "
                <div class='info'><span class='label'>Sayt növü:</span> $site_type</div>
                <div class='info'><span class='label'>İxtisaslaşma:</span> $specializations</div>
                <div class='info'><span class='label'>Çatdırılma:</span> $delivery</div>
            ";
            break;
            
        case 'video_editing':
            $message .= "
                <div class='info'><span class='label'>Video növü:</span> $video_type</div>
                <div class='info'><span class='label'>İxtisaslaşma:</span> $specializations</div>
                <div class='info'><span class='label'>Çatdırılma:</span> $delivery</div>
            ";
            break;
            
        default:
            $message .= "
                <div class='info'><span class='label'>İxtisaslaşma:</span> $specializations</div>
            ";
    }
    
    $message .= "
        </div>
        
        <div class='section'>
            <h3>Əlavə Məlumatlar</h3>
            <div class='info'><span class='label'>Portfolio:</span> $portfolio</div>
        </div>
    </body>
    </html>
    ";
    
    // Email başlıqları
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: Virtual Craft Designers <noreply@virtualcraft.az>\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    // Email göndər
    if (mail($to, $subject, $message, $headers)) {
        header('Content-Type: application/json');
        echo json_encode(['success' => true, 'message' => 'Form uğurla göndərildi!']);
    } else {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'Form göndərilərkən xəta baş verdi.']);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Etibarsız metod.']);
}
?>
