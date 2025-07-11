// Form addımlarını idarə etmək
function nextStep(currentStep) {
    const currentFormStep = document.getElementById(`step${currentStep}`);
    const nextFormStep = document.getElementById(`step${currentStep + 1}`);
    
    // Validasiya
    if (currentStep === 1 && !validateStep1()) {
        return;
    }
    if (currentStep === 2 && !validateStep2()) {
        return;
    }
    
    // Animasiya ilə keçid
    currentFormStep.classList.remove('active');
    currentFormStep.classList.add('fade-out');
    
    setTimeout(() => {
        currentFormStep.style.display = 'none';
        currentFormStep.classList.remove('fade-out');
        
        if (currentStep === 1) {
            loadSecondLevelFields();
        } else if (currentStep === 2) {
            loadThirdLevelFields();
        }
        
        nextFormStep.style.display = 'block';
        nextFormStep.classList.add('active');
        
        // Səhifənin yuxarı hissəsinə scroll et
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 300);
}

function prevStep(currentStep) {
    const currentFormStep = document.getElementById(`step${currentStep}`);
    const prevFormStep = document.getElementById(`step${currentStep - 1}`);
    
    // Animasiya ilə keçid
    currentFormStep.classList.remove('active');
    currentFormStep.classList.add('fade-out');
    
    setTimeout(() => {
        currentFormStep.style.display = 'none';
        currentFormStep.classList.remove('fade-out');
        prevFormStep.style.display = 'block';
        prevFormStep.classList.add('active');
        
        // Səhifənin yuxarı hissəsinə scroll et
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 300);
}

// 1-ci addım validasiyası
function validateStep1() {
    const fullname = document.getElementById('fullname').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const mainField = document.getElementById('main_field').value;
    
    if (!fullname || !phone || !email || !mainField) {
        alert('Zəhmət olmasa bütün məlumatları doldurun!');
        return false;
    }
    
    // Telefon nömrəsi validasiyası
    const phoneRegex = /^\+994[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
        alert('Zəhmət olmasa düzgün telefon nömrəsi daxil edin! Format: +994501234567');
        return false;
    }
    
    return true;
}

// 2-ci addım validasiyası
function validateStep2() {
    const checkboxes = document.querySelectorAll('#secondLevelFields input[type="checkbox"]:checked');
    if (checkboxes.length === 0) {
        alert('Zəhmət olmasa ən azı bir seçim edin!');
        return false;
    }
    return true;
}

// 2-ci qat sahələrini yüklə
function loadSecondLevelFields() {
    const mainField = document.getElementById('main_field').value;
    const secondLevelFields = document.getElementById('secondLevelFields');
    
    let html = '';
    
    switch(mainField) {
        case '3d_modeling':
            html = `
                <h3>Hansı proqram(lar) ilə işləyirsiniz?</h3>
                <div class="checkbox-group">
                    <label><input type="checkbox" name="tools[]" value="Blender"> Blender</label>
                    <label><input type="checkbox" name="tools[]" value="Cinema 4D"> Cinema 4D</label>
                    <label><input type="checkbox" name="tools[]" value="Maya"> Maya</label>
                    <label><input type="checkbox" name="tools[]" value="3ds Max"> 3ds Max</label>
                    <label><input type="checkbox" name="tools[]" value="ZBrush"> ZBrush</label>
                    <label><input type="checkbox" name="tools[]" value="Digər"> Digər</label>
                </div>
            `;
            break;
            
        case 'animation':
            html = `
                <h3>Hansı proqram(lar) ilə işləyirsiniz?</h3>
                <div class="checkbox-group">
                    <label><input type="checkbox" name="tools[]" value="Blender"> Blender</label>
                    <label><input type="checkbox" name="tools[]" value="After Effects"> After Effects</label>
                    <label><input type="checkbox" name="tools[]" value="Animate"> Adobe Animate</label>
                    <label><input type="checkbox" name="tools[]" value="Toon Boom"> Toon Boom</label>
                    <label><input type="checkbox" name="tools[]" value="Digər"> Digər</label>
                </div>
                
                <h3>Animasiya növü</h3>
                <div class="checkbox-group">
                    <label><input type="checkbox" name="animation_type[]" value="2D"> 2D Animasiya</label>
                    <label><input type="checkbox" name="animation_type[]" value="3D"> 3D Animasiya</label>
                    <label><input type="checkbox" name="animation_type[]" value="Motion Graphics"> Motion Graphics</label>
                    <label><input type="checkbox" name="animation_type[]" value="Karakter"> Karakter Animasiyası</label>
                </div>
            `;
            break;
            
        // Digər sahələr üçün eyni şəkildə əlavə edilə bilər
        default:
            html = `<p>Bu sahə üçün suallar hazırlanmayıb.</p>`;
    }
    
    secondLevelFields.innerHTML = html;
}

// 3-cü qat sahələrini yüklə
function loadThirdLevelFields() {
    const mainField = document.getElementById('main_field').value;
    const thirdLevelFields = document.getElementById('thirdLevelFields');
    
    let html = '';
    
    switch(mainField) {
        case '3d_modeling':
            html = `
                <h3>İxtisaslaşdığınız sahə</h3>
                <div class="checkbox-group">
                    <label><input type="checkbox" name="specialization[]" value="Oyun modelləri"> Oyun modelləri</label>
                    <label><input type="checkbox" name="specialization[]" value="Arxitektura"> Arxitektura vizuallaşdırması</label>
                    <label><input type="checkbox" name="specialization[]" value="Məhsul dizaynı"> Məhsul dizaynı</label>
                    <label><input type="checkbox" name="specialization[]" value="NFT"> NFT modellər</label>
                </div>
                
                <h3>Render mühərriki</h3>
                <div class="checkbox-group">
                    <label><input type="checkbox" name="render_engine[]" value="Cycles"> Cycles</label>
                    <label><input type="checkbox" name="render_engine[]" value="Eevee"> Eevee</label>
                    <label><input type="checkbox" name="render_engine[]" value="Arnold"> Arnold</label>
                    <label><input type="checkbox" name="render_engine[]" value="V-Ray"> V-Ray</label>
                </div>
            `;
            break;
            
        case 'animation':
            html = `
                <h3>İxtisaslaşdığınız sahə</h3>
                <div class="checkbox-group">
                    <label><input type="checkbox" name="specialization[]" value="Karakter animasiyası"> Karakter animasiyası</label>
                    <label><input type="checkbox" name="specialization[]" value="UI animasiyası"> UI animasiyası</label>
                    <label><input type="checkbox" name="specialization[]" value="Reklam animasiyası"> Reklam animasiyası</label>
                    <label><input type="checkbox" name="specialization[]" value="Təlim animasiyası"> Təlim animasiyası</label>
                </div>
                
                <h3>Əlavə bacarıqlar</h3>
                <div class="checkbox-group">
                    <label><input type="checkbox" name="skills[]" value="Rigging"> Rigging</label>
                    <label><input type="checkbox" name="skills[]" value="Səs dizaynı"> Səs dizaynı</label>
                    <label><input type="checkbox" name="skills[]" value="Storyboard"> Storyboard hazırlama</label>
                </div>
            `;
            break;
            
        // Digər sahələr üçün eyni şəkildə əlavə edilə bilər
        default:
            html = `<p>Bu sahə üçün suallar hazırlanmayıb.</p>`;
    }
    
    thirdLevelFields.innerHTML = html;
}

// Form göndərildikdə
document.getElementById('memberForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Form məlumatlarını topla
    const formData = new FormData(this);
    
    // Burada AJAX istifadə edərək formu göndərə bilərsiniz
    // Və ya sadəcə PHP faylına göndərə bilərsiniz
    
    // Nümunə: fetch API istifadəsi
    fetch('submit.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        // Uğurlu göndərilmə mesajı
        document.querySelector('.form-container').innerHTML = `
            <div class="success-message">
                <h2>Forumu doldurduğunuz üçün təşəkkür edirik!</h2>
                <p>Ən yaxın vaxtda sizinlə əlaqə quracağıq!</p>
                <button onclick="window.location.href='index.html'">Ana Səhifəyə Qayıt</button>
            </div>
        `;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Form göndərilərkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.');
    });
});
