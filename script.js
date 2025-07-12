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
                <h3>Hansı proqam(lar) ilə işləyirsiniz?</h3>
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
            
        case 'graphic_design':
            html = `
                <h3>Hansı proqram(lar) ilə işləyirsiniz?</h3>
                <div class="checkbox-group">
                    <label><input type="checkbox" name="tools[]" value="Adobe Photoshop"> Adobe Photoshop</label>
                    <label><input type="checkbox" name="tools[]" value="Adobe Illustrator"> Adobe Illustrator</label>
                    <label><input type="checkbox" name="tools[]" value="Figma"> Figma</label>
                    <label><input type="checkbox" name="tools[]" value="Canva"> Canva</label>
                    <label><input type="checkbox" name="tools[]" value="CorelDRAW"> CorelDRAW</label>
                    <label><input type="checkbox" name="tools[]" value="Digər"> Digər</label>
                </div>
                
                <h3>İş növü</h3>
                <div class="checkbox-group">
                    <label><input type="checkbox" name="work_type[]" value="Sosial media postları"> Sosial media postları</label>
                    <label><input type="checkbox" name="work_type[]" value="Afişa və posterlər"> Afişa və posterlər</label>
                    <label><input type="checkbox" name="work_type[]" value="Vizit kartlar"> Vizit kartlar</label>
                    <label><input type="checkbox" name="work_type[]" value="Reklam bannerləri"> Reklam bannerləri</label>
                    <label><input type="checkbox" name="work_type[]" value="Digər"> Digər</label>
                </div>
            `;
            break;
            
        case 'web_design':
            html = `
                <h3>Hansı platformalar ilə işləyirsiniz?</h3>
                <div class="checkbox-group">
                    <label><input type="checkbox" name="tools[]" value="WordPress"> WordPress</label>
                    <label><input type="checkbox" name="tools[]" value="Wix"> Wix</label>
                    <label><input type="checkbox" name="tools[]" value="Webflow"> Webflow</label>
                    <label><input type="checkbox" name="tools[]" value="HTML/CSS"> HTML/CSS</label>
                    <label><input type="checkbox" name="tools[]" value="Digər"> Digər</label>
                </div>
                
                <h3>Sayt növü</h3>
                <div class="checkbox-group">
                    <label><input type="checkbox" name="site_type[]" value="Portfolio"> Portfolio</label>
                    <label><input type="checkbox" name="site_type[]" value="Bloq"> Bloq</label>
                    <label><input type="checkbox" name="site_type[]" value="E-ticarət"> E-ticarət</label>
                    <label><input type="checkbox" name="site_type[]" value="Kompaniya saytı"> Kompaniya saytı</label>
                    <label><input type="checkbox" name="site_type[]" value="Digər"> Digər</label>
                </div>
            `;
            break;
            
        case 'video_editing':
            html = `
                <h3>Hansı proqram(lar) ilə işləyirsiniz?</h3>
                <div class="checkbox-group">
                    <label><input type="checkbox" name="tools[]" value="Adobe Premiere Pro"> Adobe Premiere Pro</label>
                    <label><input type="checkbox" name="tools[]" value="CapCut"> CapCut</label>
                    <label><input type="checkbox" name="tools[]" value="DaVinci Resolve"> DaVinci Resolve</label>
                    <label><input type="checkbox" name="tools[]" value="Final Cut Pro"> Final Cut Pro</label>
                    <label><input type="checkbox" name="tools[]" value="Sony Vegas"> Sony Vegas</label>
                    <label><input type="checkbox" name="tools[]" value="Digər"> Digər</label>
                </div>
                
                <h3>Video növü</h3>
                <div class="checkbox-group">
                    <label><input type="checkbox" name="video_type[]" value="YouTube videoları"> YouTube videoları</label>
                    <label><input type="checkbox" name="video_type[]" value="TikTok/Reels"> TikTok/Reels</label>
                    <label><input type="checkbox" name="video_type[]" value="Reklam çarxları"> Reklam çarxları</label>
                    <label><input type="checkbox" name="video_type[]" value="Təlim videoları"> Təlim videoları</label>
                    <label><input type="checkbox" name="video_type[]" value="Digər"> Digər</label>
                </div>
            `;
            break;
            
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
            
        case 'graphic_design':
            html = `
                <h3>İxtisaslaşma</h3>
                <div class="checkbox-group">
                    <label><input type="checkbox" name="specialization[]" value="Brend üçün tam dizayn paketi"> Brend üçün tam dizayn paketi</label>
                    <label><input type="checkbox" name="specialization[]" value="Qrafik setlər"> Qrafik setlər</label>
                    <label><input type="checkbox" name="specialization[]" value="İnfografika"> İnfografika</label>
                    <label><input type="checkbox" name="specialization[]" value="Mockup-lar"> Mockup-lar</label>
                    <label><input type="checkbox" name="specialization[]" value="Digər"> Digər</label>
                </div>
                
                <h3>Çatdırılma formatı</h3>
                <div class="checkbox-group">
                    <label><input type="checkbox" name="delivery_format[]" value="JPG"> .JPG</label>
                    <label><input type="checkbox" name="delivery_format[]" value="PNG"> .PNG</label>
                    <label><input type="checkbox" name="delivery_format[]" value="AI"> .AI</label>
                    <label><input type="checkbox" name="delivery_format[]" value="PDF"> .PDF</label>
                    <label><input type="checkbox" name="delivery_format[]" value="Digər"> Digər</label>
                </div>
            `;
            break;
            
        case 'web_design':
            html = `
                <h3>İxtisaslaşma</h3>
                <div class="checkbox-group">
                    <label><input type="checkbox" name="specialization[]" value="Hazır template redaktəsi"> Hazır template redaktəsi</label>
                    <label><input type="checkbox" name="specialization[]" value="Sıfırdan dizayn + kod"> Sıfırdan dizayn + kod</label>
                    <label><input type="checkbox" name="specialization[]" value="CMS quraşdırma və idarə"> CMS quraşdırma və idarə</label>
                    <label><input type="checkbox" name="specialization[]" value="UI + front-end birləşməsi"> UI + front-end birləşməsi</label>
                    <label><input type="checkbox" name="specialization[]" value="Digər"> Digər</label>
                </div>
                
                <h3>Çatdırılma</h3>
                <div class="checkbox-group">
                    <label><input type="checkbox" name="delivery[]" value="ZIP layihə faylı"> ZIP layihə faylı</label>
                    <label><input type="checkbox" name="delivery[]" value="Hosting bağlantısı"> Hosting bağlantısı</label>
                    <label><input type="checkbox" name="delivery[]" value="GitHub repo"> GitHub repo</label>
                    <label><input type="checkbox" name="delivery[]" value="Digər"> Digər</label>
                </div>
            `;
            break;
            
        case 'video_editing':
            html = `
                <h3>İxtisaslaşma</h3>
                <div class="checkbox-group">
                    <label><input type="checkbox" name="specialization[]" value="Səs dizaynı"> Səs dizaynı</label>
                    <label><input type="checkbox" name="specialization[]" value="Effekt əlavə etmə (VFX)"> Effekt əlavə etmə (VFX)</label>
                    <label><input type="checkbox" name="specialization[]" value="Yazı və altyazı montajı"> Yazı və altyazı montajı</label>
                    <label><input type="checkbox" name="specialization[]" value="Green screen işləmə"> Green screen işləmə</label>
                    <label><input type="checkbox" name="specialization[]" value="Digər"> Digər</label>
                </div>
                
                <h3>Çatdırılma</h3>
                <div class="checkbox-group">
                    <label><input type="checkbox" name="delivery[]" value="MP4"> .MP4</label>
                    <label><input type="checkbox" name="delivery[]" value="MOV"> .MOV</label>
                    <label><input type="checkbox" name="delivery[]" value="Layihə faylı"> Layihə faylı (.prproj və s.)</label>
                    <label><input type="checkbox" name="delivery[]" value="Digər"> Digər</label>
                </div>
            `;
            break;
            
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
    
    fetch('submit.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
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
