/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vận Tải Hùng Anh - Logistics Script
 */

// Hàm tính toán giá vận chuyển đơn giản
function initCalculator() {
  const distanceInput = document.getElementById('distance-input');
  const weightInput = document.getElementById('weight-input');
  const resultContainer = document.getElementById('result-container');
  const distanceDisplay = document.getElementById('distance-display');
  const priceValue = document.getElementById('price-value');

  if (!distanceInput || !weightInput || !resultContainer || !distanceDisplay || !priceValue) return;

  function calculateShipping() {
    const distance = parseFloat(distanceInput.value) || 0;
    const weight = parseFloat(weightInput.value) || 0;

    if (distance <= 0) {
      resultContainer.classList.add('hidden');
      return;
    }

    // Logic tính giá: 
    // Giá = (khoảng cách (km) × 10.000đ) + (cân nặng (kg) × 5.000đ) + phí cố định: 50.000đ
    const baseFee = 50000;
    const pricePerKm = 10000;
    const pricePerKg = 5000;
    const totalPrice = Math.round((distance * pricePerKm) + (weight * pricePerKg) + baseFee);

    // Hiển thị kết quả
    distanceDisplay.innerText = `${distance} km`;
    priceValue.innerText = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice);
    
    resultContainer.classList.remove('hidden');
  }

  distanceInput.addEventListener('input', calculateShipping);
  weightInput.addEventListener('input', calculateShipping);
}

// Hero Slider Logic
function initHeroSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dot');
  let currentSlide = 0;
  let slideInterval;

  if (slides.length === 0) return;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.opacity = i === index ? '1' : '0';
    });
    dots.forEach((dot, i) => {
      dot.style.backgroundColor = i === index ? 'white' : 'rgba(255, 255, 255, 0.5)';
      dot.style.width = i === index ? '24px' : '12px';
    });
    currentSlide = index;
  }

  function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  function startInterval() {
    stopInterval();
    slideInterval = setInterval(nextSlide, 5000);
  }

  function stopInterval() {
    if (slideInterval) clearInterval(slideInterval);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      startInterval();
    });
  });

  // Khởi tạo slide đầu tiên
  showSlide(0);
  startInterval();
}

// Đảm bảo script chạy sau khi DOM load
document.addEventListener('DOMContentLoaded', () => {
  console.log('Vận Tải Hùng Anh Website Loaded');
  
  initCalculator();
  initHeroSlider();
  
  // Xử lý form liên hệ
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    let submitTarget = 'messenger'; // Mặc định

    // Bắt sự kiện click trên các nút submit để biết khách hàng chọn gửi qua đâu
    const submitButtons = contactForm.querySelectorAll('button[type="submit"]');
    submitButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        submitTarget = btn.getAttribute('data-target');
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Lấy dữ liệu từ form
      const name = document.getElementById('contact-name').value;
      const phone = document.getElementById('contact-phone').value;
      const service = document.getElementById('contact-service').value;
      const message = document.getElementById('contact-message').value;
      
      // Tạo nội dung tin nhắn
      const fullMessage = `Chào Vận Tải Hùng Anh, tôi cần tư vấn:\n- Họ tên: ${name}\n- SĐT: ${phone}\n- Dịch vụ: ${service}\n- Lời nhắn: ${message}`;
      
      if (submitTarget === 'messenger') {
        // Sao chép tin nhắn vào bộ nhớ tạm
        navigator.clipboard.writeText(fullMessage).then(() => {
          alert('Thông tin của bạn đã được tự động sao chép. Hệ thống sẽ chuyển bạn đến Messenger, bạn chỉ cần "Dán" (Paste) vào ô chat và gửi đi nhé!');
          
          // Mở Messenger
          const messengerUrl = `https://m.me/0388572672`;
          window.open(messengerUrl, '_blank');
        }).catch(err => {
          console.error('Lỗi sao chép: ', err);
          window.open(`https://m.me/0388572672`, '_blank');
        });
      } else {
        // Sao chép tin nhắn vào bộ nhớ tạm
        navigator.clipboard.writeText(fullMessage).then(() => {
          alert('Thông tin của bạn đã được tự động sao chép. Hệ thống sẽ chuyển bạn đến Zalo, bạn chỉ cần "Dán" (Paste) vào ô chat và gửi đi nhé!');
          
          // Mở Zalo
          const zaloUrl = `https://zalo.me/0388572672`;
          window.open(zaloUrl, '_blank');
        }).catch(err => {
          console.error('Lỗi sao chép: ', err);
          window.open(`https://zalo.me/0388572672`, '_blank');
        });
      }
      
      contactForm.reset();
    });
  }
});
