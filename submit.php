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
    $specializations = isset($_POST['specialization']) ? implode(", ", $_POST['specialization']) : '';
    
    // Email məzmunu
    $to = "yunisrehmanzada@gmail.com";
    $subject = "Virtual Craft - Yeni Komanda Üzvü Müraciəti";
    $message = "
    <html>
    <head>
        <title>Yeni Komanda Üzvü Müraciəti</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            h2 { color: #006064; }
            .info { margin-bottom: 15px; }
            .label { font-weight: bold; color: #006064; }
        </style>
    </head>
    <body>
        <h2>Yeni Komanda Üzvü Müraciəti</h2>
        
        <div class='info'><span class='label'>Ad Soyad:</span> $fullname</div>
        <div class='info'><span class='label'>Telefon:</span> $phone</div>
        <div class='info'><span class='label'>Email:</span> $email</div>
        <div class='info'><span class='label'>Əsas Sahə:</span> $main_field</div>
        
        <h3>İxtisaslaşma</h3>
        <div class='info'><span class='label'>İstifadə olunan proqramlar:</span> $tools</div>
        <div class='info'><span class='label'>İxtisaslaşma sahələri:</span> $specializations</div>
        
        <div class='info'><span class='label'>Portfolio:</span> $portfolio</div>
    </body>
    </html>
    ";
    
    // Email başlıqları
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: Virtual Craft <noreply@virtualcraft.az>\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    // Email göndər
    if (mail($to, $subject, $message, $headers)) {
        // Uğurlu cavab
        header('Content-Type: application/json');
        echo json_encode(['success' => true, 'message' => 'Form uğurla göndərildi!']);
    } else {
        // Xəta mesajı
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'Form göndərilərkən xəta baş verdi.']);
    }
} else {
    // Etibarsız metod
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Etibarsız metod.']);
}
?>
