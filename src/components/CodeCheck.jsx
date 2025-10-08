import React, { useState, useEffect } from "react";
import { Input, Button, Typography, Modal, Row, Col, message } from "antd";
import { SearchOutlined, HomeOutlined, GiftOutlined } from "@ant-design/icons";
import "./CodeCheck.css";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import confetti from "canvas-confetti";
import { createApiUrl, API_ENDPOINTS } from "../config/api";

const { Title } = Typography;

const PRIZES = [
  "airpods_none",
  "code_none",
  "fridge_none",
  "mobile_none",
  "sh_none",
  "television_none",
];

const REWARD_LABELS = {
  code: "mã code cộng điểm",
  fridge: "tủ lạnh",
  mobile: "điện thoại",
  television: "TV",
  airpods: "Airpod Pro",
  sh: "xe sh",
};

const REWARD_LABELS_DETAIL = {
  airpods: "AIRPODS PRO",
  code: "CODE NGẪU NHIÊN 18-8888K",
  fridge: "TỦ LẠNH LG",
  mobile: "ĐIỆN THOẠI iPhone 17",
  sh: "XE SH 150i",
  television: "TV SAMSUNG 55 INCH",
};

const winners = [
  <>
    nguyen*** – trúng <div className="icon code" /> Code trị giá 3888k
  </>,
  <>
    hoang*** – trúng <div className="icon code" /> Code ngẫu nhiên 18-888k
  </>,
  <>
    linh*** – trúng <div className="icon airpods" /> Tai nghe aripods
  </>,
  <>
    minhan*** – trúng <div className="icon mobile" /> iPhone 17
  </>,
  <>
    phuc*** – trúng <div className="icon code" /> Code trị giá 5888k"
  </>,
  <>
    bao*** – trúng <div className="icon fridge" /> Tủ lạnh LG
  </>,
  <>
    long*** – trúng <div className="icon code" /> Code trị giá 8888k
  </>,
  <>
    hoa*** – trúng <div className="icon code" /> Code ngẫu nhiên 18-888k
  </>,
  <>
    tien*** – trúng <div className="icon code" /> Code trị giá 3888k
  </>,
  <>
    kim*** – trúng <div className="icon mobile" /> iPhone 17
  </>,
  <>
    manh*** – trúng <div className="icon code" /> Code ngẫu nhiên 18-888k
  </>,
  <>
    quang*** – trúng <div className="icon moto" /> Xe SH 150i
  </>,
  <>
    thanh*** – trúng <div className="icon airpods" /> Tai nghe aripods
  </>,
  <>
    tam*** – trúng <div className="icon code" /> Code trị giá 5888k"
  </>,
  <>
    lyly*** – trúng <div className="icon code" /> Code ngẫu nhiên 18-888k
  </>,
  <>
    khanh*** – trúng <div className="icon code" /> Code trị giá 8888k
  </>,
  <>
    minhduc*** – trúng <div className="icon code" /> Code trị giá 3888k
  </>,
  <>
    chi*** – trúng <div className="icon mobile" /> iPhone 17
  </>,
  <>
    le*** – trúng <div className="icon code" /> Code ngẫu nhiên 18-888k
  </>,
  <>
    thuy*** – trúng <div className="icon airpods" /> Tai nghe aripods
  </>,
  <>
    truo*** – trúng <div className="icon fridge" /> Tủ lạnh LG
  </>,
  <>
    hoangc*** – trúng <div className="icon code" /> Code trị giá 3888k
  </>,
  <>
    quynh*** – trúng <div className="icon code" /> Code ngẫu nhiên 18-888k
  </>,
  <>
    tuanm*** – trúng <div className="icon code" /> Code trị giá 8888k
  </>,
  <>
    cuong*** – trúng <div className="icon tv" /> Code trị giá 5888k"
  </>,
  <>
    hath*** – trúng <div className="icon code" /> Code trị giá 3888k
  </>,
  <>
    lam*** – trúng <div className="icon mobile" /> iPhone 17
  </>,
  <>
    mya*** – trúng <div className="icon code" /> Code ngẫu nhiên 18-888k
  </>,
  <>
    dat*** – trúng <div className="icon code" /> Code ngẫu nhiên 18-888k
  </>,
  <>
    tinhoc*** – trúng <div className="icon moto" /> Xe SH 150i
  </>,
  <>
    maing*** – trúng <div className="icon code" /> Code ngẫu nhiên 18-888k
  </>,
  <>
    trongn*** – trúng <div className="icon airpods" /> Tai nghe aripods
  </>,
  <>
    kiml*** – trúng <div className="icon code" /> Code trị giá 5888k"
  </>,
  <>
    khaing*** – trúng <div className="icon code" /> Code trị giá 3888k
  </>,
  <>
    tuananh*** – trúng <div className="icon fridge" /> Tủ lạnh LG
  </>,
  <>
    phuongh*** – trúng <div className="icon code" /> Code ngẫu nhiên 18-888k
  </>,
  <>
    hoangk*** – trúng <div className="icon airpods" /> Tai nghe aripods
  </>,
  <>
    trangc*** – trúng <div className="icon mobile" /> iPhone 17
  </>,
  <>
    hieu*** – trúng <div className="icon code" /> Code trị giá 3888k
  </>,
  <>
    phat*** – trúng <div className="icon code" /> Code ngẫu nhiên 18-888k
  </>,
  <>
    nhut*** – trúng <div className="icon code" /> Code ngẫu nhiên 18-888k
  </>,
  <>
    duongc*** – trúng <div className="icon airpods" /> Tai nghe aripods
  </>,
  <>
    leth*** – trúng <div className="icon tv" /> Code trị giá 5888k"
  </>,
  <>
    anhk*** – trúng <div className="icon code" /> Code trị giá 8888k
  </>,
  <>
    vuong*** – trúng <div className="icon code" /> Code trị giá 3888k
  </>,
  <>
    hothanh*** – trúng <div className="icon code" /> Code ngẫu nhiên 18-888k
  </>,
  <>
    tamt*** – trúng <div className="icon moto" /> Xe SH 150i
  </>,
  <>
    tienth*** – trúng <div className="icon mobile" /> iPhone 17
  </>,
  <>
    nganx*** – trúng <div className="icon code" /> Code ngẫu nhiên 18-888k
  </>,
  <>
    trangk*** – trúng <div className="icon mobile" /> iPhone 17
  </>,
  <>
    duongn*** – trúng <div className="icon code" /> Code trị giá 3888k
  </>,
  <>
    son*** – trúng <div className="icon code" /> Code ngẫu nhiên 18-888k
  </>,
  <>
    quoc*** – trúng <div className="icon airpods" /> Tai nghe aripods
  </>,
  <>
    hoangm*** – trúng <div className="icon code" /> Code ngẫu nhiên 18-888k
  </>,
  <>
    kien*** – trúng <div className="icon code" /> Code trị giá 5888k"
  </>,
  <>
    vut*** – trúng <div className="icon code" /> Code trị giá 3888k
  </>,
  <>
    trungk*** – trúng <div className="icon airpods" /> Tai nghe aripods
  </>,
  <>
    longv*** – trúng <div className="icon moto" /> Xe SH 150i
  </>,
  <>
    truongb*** – trúng <div className="icon code" /> Code ngẫu nhiên 18-888k
  </>,
  <>
    minhph*** – trúng <div className="icon code" /> Code ngẫu nhiên 18-888k
  </>,
  <>
    giang*** – trúng <div className="icon mobile" /> iPhone 17
  </>,
  <>
    minhng*** – trúng <div className="icon code" /> Code trị giá 3888k
  </>,
  <>
    nhat*** – trúng <div className="icon airpods" /> Tai nghe aripods
  </>,
  <>
    tan*** – trúng <div className="icon code" /> Code ngẫu nhiên 18-888k
  </>,
  <>
    baong*** – trúng <div className="icon tv" /> Code trị giá 5888k"
  </>,
  <>
    duc*** – trúng <div className="icon code" /> Code trị giá 8888k
  </>,
  <>
    tuanl*** – trúng <div className="icon code" /> Code ngẫu nhiên 18-888k
  </>,
  <>
    ngoct*** – trúng <div className="icon code" /> Code trị giá 3888k
  </>,
  <>
    hieul*** – trúng <div className="icon mobile" /> iPhone 17
  </>,
  <>
    phuongn*** – trúng <div className="icon code" /> Code ngẫu nhiên 18-888k
  </>,
  <>
    thut*** – trúng <div className="icon airpods" /> Tai nghe aripods
  </>,
  <>
    nguyenth*** – trúng <div className="icon tv" /> Code trị giá 5888k"
  </>,
  <>
    kevin*** – trúng <div className="icon moto" /> Xe SH 150i
  </>,
  <>
    thanhn*** – trúng <div className="icon code" /> Code ngẫu nhiên 18-888k
  </>,
  <>
    tuyetn*** – trúng <div className="icon mobile" /> iPhone 17
  </>,
  <>
    vuongh*** – trúng <div className="icon code" /> Code trị giá 3888k
  </>,
  <>
    truongv*** – trúng <div className="icon code" /> Code ngẫu nhiên 18-888k
  </>,
  <>
    lamt*** – trúng <div className="icon tv" /> Code trị giá 5888k"
  </>,
  <>
    linht*** – trúng <div className="icon airpods" /> Tai nghe aripods
  </>,
  <>
    phatd*** – trúng <div className="icon code" /> Code trị giá 3888k
  </>,
  <>
    baoanh*** – trúng <div className="icon code" /> Code ngẫu nhiên 18-888k
  </>,
  <>
    huongb*** – trúng <div className="icon mobile" /> iPhone 17
  </>,
  <>
    nguyenv*** – trúng <div className="icon code" /> Code trị giá 8888k
  </>,
  <>
    trongl*** – trúng <div className="icon code" /> Code trị giá 3888k
  </>,
  <>
    thutri*** – trúng <div className="icon airpods" /> Tai nghe aripods
  </>,
  <>
    tamm*** – trúng <div className="icon code" /> Code ngẫu nhiên 18-888k
  </>,
  <>
    phuonga*** – trúng <div className="icon code" /> Code trị giá 3888k
  </>,
  <>
    longd*** – trúng <div className="icon mobile" /> iPhone 17
  </>,
  <>
    ngocm*** – trúng <div className="icon airpods" /> Tai nghe aripods
  </>,
  <>
    baoti*** – trúng <div className="icon code" /> Code ngẫu nhiên 18-888k
  </>,
  <>
    ngocth*** – trúng <div className="icon fridge" /> Tủ lạnh LG
  </>,
  <>
    hoangy*** – trúng <div className="icon mobile" /> iPhone 17
  </>,
  <>
    tamho*** – trúng <div className="icon code" /> Code trị giá 8888k
  </>,
  <>
    bichtr*** – trúng <div className="icon code" /> Code trị giá 3888k
  </>,
  <>
    tuanho*** – trúng <div className="icon code" /> Code trị giá 8888k
  </>,
  <>
    thanhh*** – trúng <div className="icon code" /> Code ngẫu nhiên 18-888k
  </>,
  <>
    huongn*** – trúng <div className="icon airpods" /> Tai nghe aripods
  </>,
  <>
    thaing*** – trúng <div className="icon tv" /> Code trị giá 5888k"
  </>,
  <>
    minhk*** – trúng <div className="icon code" /> Code ngẫu nhiên 18-888k
  </>,
  <>
    vuhoa*** – trúng <div className="icon mobile" /> iPhone 17
  </>,
  <>
    anhthu*** – trúng <div className="icon airpods" /> Tai nghe aripods
  </>,
  <>
    maiva*** – trúng <div className="icon code" /> Code ngẫu nhiên 18-888k
  </>,
  <>
    lethan*** – trúng <div className="icon moto" /> Xe SH 150i
  </>,
  <>
    kienl*** – trúng <div className="icon code" /> Code ngẫu nhiên 18-888k
  </>,
];

const REWARD_DETAILS = {
  sh: {
    label: "Xe SH 150i",
    description:
      "5 phần thưởng là Xe tay ga SH 150i – biểu tượng của đẳng cấp và sự mạnh mẽ. Dòng xe sang trọng bậc nhất, phù hợp với mọi phong cách người chơi.",
  },
  fridge: {
    label: "Tủ lạnh LG",
    description:
      "15 chiếc tủ lạnh LG Inverter dung tích lớn, giúp bảo quản thực phẩm tươi ngon dài lâu. Công nghệ tiết kiệm điện, vận hành êm ái – món quà thiết thực cho mọi gia đình.",
  },
  television: {
    label: 'TV Samsung 55"',
    description:
      '20 chiếc Smart TV Samsung 55" 4K – tận hưởng trải nghiệm giải trí đỉnh cao ngay tại nhà với hình ảnh sắc nét và âm thanh sống động.',
  },
  mobile: {
    label: "iPhone 17",
    description:
      "25 siêu phẩm iPhone 17 chính hãng – hiệu năng vượt trội, camera đỉnh cao, sạc nhanh siêu tốc. Dành cho những người chơi may mắn và thời thượng.",
  },
  airpods: {
    label: "AirPods Pro",
    description:
      "50 phần quà AirPods Pro – âm thanh đỉnh cao, khử tiếng ồn chủ động, trải nghiệm không dây tuyệt vời cho mọi nhu cầu nghe nhạc, học tập và làm việc.",
  },
  code: {
    label: "Mã code nạp",
    description:
      "4000 mã code cộng điểm giá trị ngẫu nhiên từ 18.000đ đến 8,888,888.000đ. Nhận code, nhập ngay – điểm vào tài khoản liền tay!",
  },
};

const CodeCheck = () => {
  const [account, setAccount] = useState("");
  const [code, setCode] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [point, setPoint] = useState("");
  const [reward, setReward] = useState("");
  const [clickedIndex, setClickedIndex] = useState(null);
  const [chestImages, setChestImages] = useState([]);
  const [animatingIndex, setAnimatingIndex] = useState(null);
  const [isCodeSubmitted, setIsCodeSubmitted] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRewardKey, setSelectedRewardKey] = useState(null);
  const [isLoadingChest, setIsLoadingChest] = useState(false);
  const [isProcessingChest, setIsProcessingChest] = useState(false);
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.id = "confetti-canvas";
    canvas.style.position = "fixed";
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = 9999;
    document.body.appendChild(canvas);

    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });

    window.myConfetti = myConfetti; // Gắn global để gọi sau

    return () => {
      document.body.removeChild(canvas);
    };
  }, []);

  const [rewardMessage, setRewardMessage] = useState(
    "🎁 Chọn 1 trong 9 rương để nhận thưởng"
  );

  const handleCheckCode = async () => {
    if (!code.trim()) {
      message.warning("Vui lòng nhập mã code!");
      return;
    }

    try {
      setIsLoadingChest(true);
      const res = await axios.post(createApiUrl(API_ENDPOINTS.CHECK_CODE), {
        code,
      });

      setPoint(res.data.point);
      setReward(res.data.reward);
      setSelectedPrize(null);
      setOpen(true);
    } catch (err) {
      const msg = err.response?.data?.message || "Lỗi không xác định!";
      message.error(msg);
    } finally {
      setIsLoadingChest(false);
    }
    setIsCodeSubmitted(false);
  };
  const handleLoadCode = async () => {
    if (isLoading) return;
    setIsLoading(true);

    if (!account.trim()) {
      message.warning("Vui lòng nhập account để nhận quà!");
      setIsLoading(false);
      return;
    }

    if (selectedPrize !== "code") {
      try {
        await axios.post(createApiUrl(API_ENDPOINTS.PLUS_POINT), {
          code,
          account,
        });
        message.success("Nhận quà thành công!");
        setOpen(false);
        setSelectedPrize(null);
        setIsCodeSubmitted(true);
        setShowLoadModal(false);
        setShowButton(false);
        return;
      } catch (err) {
        message.error("Lỗi kết nối máy chủ nạp điểm!");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    if (!isCodeSubmitted) {
      try {
        await axios.post(createApiUrl(API_ENDPOINTS.PLUS_POINT), {
          code,
          account,
        });
        message.success("Nạp điểm thành công!");
        setOpen(false);
        setSelectedPrize(null);
        setIsCodeSubmitted(true);
        setShowLoadModal(false);
        setShowButton(false);
        return;
        // const response = await fetch(
        //   "https://apidiem01.newpei.ink/api/auto-codehf",
        //   {
        //     method: "POST",
        //     mode: "cors",
        //     credentials: "omit",
        //     headers: {
        //       "Content-Type": "application/json",
        //       "X-API-KEY": "6623code_secure_api_key_$%^@!",
        //     },
        //     body: JSON.stringify({
        //       userName: account.toLowerCase(),
        //       amount: point,
        //     }),
        //   }
        // );
        // const result = await response.json();
        // if (result.success) {
        //   await axios.post("/api/6623-reward/plus-poin", {
        //     code,
        //     account,
        //   });
        //   message.success("Nạp điểm thành công!");
        //   setOpen(false);
        //   setSelectedPrize(null);
        //   setIsCodeSubmitted(true);
        //   setShowLoadModal(false);
        //   setShowButton(false);
        //   return;
        // } else {
        //   message.error(result.message || "Nạp điểm thất bại!");
        // }
      } catch (error) {
        message.error("Lỗi kết nối máy chủ nạp điểm!");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChestClick = async (index) => {
    if (isProcessingChest) return;
    setIsProcessingChest(true);

    try {
      await axios.post(createApiUrl(API_ENDPOINTS.USE_CODE), {
        code,
      });
    } catch (err) {
      message.error("Lỗi server!");
      console.log(err);
      setIsProcessingChest(false);
      return;
    }

    setAnimatingIndex(index);

    setTimeout(() => {
      setSelectedPrize(reward);
      setClickedIndex(index);

      setShowButton(true);

      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;

      const interval = setInterval(() => {
        if (Date.now() > animationEnd) {
          clearInterval(interval);
        }

        window.myConfetti &&
          window.myConfetti({
            particleCount: 80,
            startVelocity: 30,
            spread: 360,
            ticks: 60,
            origin: {
              x: Math.random(),
              y: Math.random() * 0.6,
            },
          });
      }, 200);

      const filteredPrizes = PRIZES.filter((p) => !p.startsWith(reward));
      const otherImages = shuffleArray(filteredPrizes).slice(0, 8);
      const finalImages = [...otherImages];
      finalImages.splice(index, 0, reward);
      setChestImages(finalImages);
      setAnimatingIndex(null);
      setIsProcessingChest(false);
    }, 1000);
  };

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (!selectedPrize) {
      setRewardMessage("🎁 Chọn 1 trong 9 rương để nhận thưởng");
    } else {
      const label = REWARD_LABELS[selectedPrize] || "phần thưởng";
      setRewardMessage(`🎉 Chúc mừng bạn trúng ${label}`);
    }
  }, [selectedPrize]);

  return (
    <div className="code-check-container">
      <div className="home">
        <Button
          type="primary"
          icon={<HomeOutlined />}
          size="large"
          className="home-btn"
          onClick={() =>
            (window.location.href = "https://662301.99886633.pro/")
          }
        >
          Trang chủ
        </Button>
      </div>
      <img src="/assets/logo-6623.png" alt="logo" style={{ maxWidth: 180 }} />
      <Title level={2} className="title">
        KIỂM TRA MÃ CODE NHẬN THƯỞNG
      </Title>
      <div className="info-columns">
        {/* Giải thưởng bên trái */}
        <div className="info-box">
          <h3>🎁 Giải thưởng:</h3>
          <ul>
            <li style={{ display: "flex" }}>
              <div className="moto icon" />
              Giải đặc biệt Xe SH 150i
            </li>
            <li style={{ display: "flex" }}>
              <div className="mobile icon" />
              Giải nhất iPhone 17
            </li>
            <li style={{ display: "flex" }}>
              <div className="fridge icon" />
              Giải nhì Tủ lạnh LG
            </li>
            <li style={{ display: "flex" }}>
              <div className="tv icon" />
              Giải ba TV Samsung 55"
            </li>
            <li style={{ display: "flex" }}>
              <div className="airpods icon" />
              Tai nghe aripods
            </li>
            <li style={{ display: "flex" }}>
              <div className="code icon" />
              Code trị giá 8888k
            </li>
            <li style={{ display: "flex" }}>
              <div className="code icon" />
              Code trị giá 5888k
            </li>
            <li style={{ display: "flex" }}>
              <div className="code icon" />
              Code trị giá 3888k
            </li>
            <li style={{ display: "flex" }}>
              <div className="code icon" />
              Code ngẫu nhiên 18-888k
            </li>
          </ul>
        </div>

        {/* Form ở giữa */}
        <div className="form-input">
          <div className="input-frame">
            <Input
              className="code-input"
              placeholder="Nhập code tại đây"
              value={code}
              onChange={(e) => setCode(e.target.value.trim())}
              size="large"
              maxLength={20}
            />
          </div>
          <Button
            type="primary"
            icon={<GiftOutlined />}
            size="large"
            className="check-btn"
            onClick={handleCheckCode}
            style={{
              borderRadius: 24,
              padding: "0 20px",
            }}
            loading={isLoadingChest}
          >
            Mở rương ngay
          </Button>
        </div>

        {/* Người nhận bên phải */}
        <div className="info-box">
          <h3>🧑 Người nhận gần đây:</h3>
          <div className="winner-marquee-outer">
            <div className="winner-marquee-inner">
              {[...winners, ...winners].map((text, i) => (
                <div className="winner-item" key={i}>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onCancel={() => {
          if (!isCodeSubmitted) {
            Modal.confirm({
              title: "Bạn chưa nhận quà",
              content: "Bạn có chắc muốn thoát khi chưa nhận quà?",
              okText: "Thoát",
              cancelText: "Ở lại",
              className: "popup-confirm-close",
              onOk: () => {
                setOpen(false);
                setSelectedPrize(null);
              },
            });
            return;
          }

          setOpen(false);
          setSelectedPrize(null);
        }}
        footer={null}
        centered
        width={800}
        className="popup"
      >
        <Title level={3} style={{ textAlign: "center" }}>
          {rewardMessage}
        </Title>

        <Row gutter={[8, 8]}>
          {Array.from({ length: 9 }).map((_, index) => {
            let imgSrc = "/assets/ruong.png";

            if (selectedPrize !== null) {
              const imgKey = chestImages[index];
              imgSrc = `/assets/${imgKey}.png`;
            }

            return (
              <Col xs={8} key={index} style={{ position: "relative" }}>
                <img
                  className={`chest-box ${
                    animatingIndex === index
                      ? "chest-animating"
                      : selectedPrize && index === clickedIndex
                      ? "chest-opened"
                      : ""
                  }`}
                  src={imgSrc}
                  alt={`Rương ${index + 1}`}
                  style={{
                    width: "100%",
                    cursor: selectedPrize ? "default" : "pointer",
                  }}
                  onClick={() => {
                    if (!selectedPrize) handleChestClick(index);
                  }}
                />
                {showButton && index === clickedIndex && selectedPrize && (
                  <button
                    className="btn-receive-gift"
                    onClick={() => setShowLoadModal(true)}
                  >
                    Nhận quà
                  </button>
                )}
              </Col>
            );
          })}
        </Row>
      </Modal>
      <Modal
        open={showLoadModal}
        onCancel={() => {
          setShowLoadModal(false);
        }}
        closable={false}
        footer={null}
        centered
        width={350}
      >
        <Title level={5} style={{ textAlign: "center", marginBottom: "20px" }}>
          🎉CHÚC MỪNG BẠN ĐÃ NHẬN ĐƯỢC {REWARD_LABELS_DETAIL[selectedPrize]}
        </Title>
        <label style={{ fontWeight: 500 }}>Nhập tài khoản để nhận quà</label>
        <Input
          label="ddd"
          placeholder="Nhập tài khoản để nhận quà"
          value={account}
          onChange={(e) => setAccount(e.target.value.trim())}
          style={{ marginBottom: "30px", marginTop: "10px", borderRadius: 8 }}
          maxLength={20}
        />
        <Button
          type="primary"
          className="load-code"
          block
          onClick={handleLoadCode}
          loading={isLoading}
        >
          Xác nhận
        </Button>
      </Modal>
      <Modal
        open={!!selectedRewardKey}
        onCancel={() => setSelectedRewardKey(null)}
        footer={null}
        centered
        width={400}
        className="popup-prize-detail"
      >
        <Title level={4} style={{ textAlign: "center" }}>
          🎁 Chi tiết phần thưởng
        </Title>
        {selectedRewardKey && (
          <div style={{ textAlign: "center" }}>
            <img
              src={`/assets/${selectedRewardKey}.png`}
              alt={REWARD_DETAILS[selectedRewardKey].label}
              style={{ maxWidth: "100%", marginBottom: 20 }}
            />
            <p style={{ fontSize: 20, fontWeight: 600 }}>
              {REWARD_DETAILS[selectedRewardKey].label}
            </p>
            <p style={{ fontSize: 16 }}>
              {REWARD_DETAILS[selectedRewardKey].description}
            </p>
          </div>
        )}
      </Modal>

      <div className="gift-slider">
        <Slider
          autoplay
          infinite
          slidesToShow={3}
          slidesToScroll={1}
          arrows={false}
          responsive={[
            {
              breakpoint: 768, // Mobile
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 1024, // Tablet
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
          ]}
        >
          {Object.keys(REWARD_LABELS).map((key, index) => (
            <div
              key={index}
              className="slider-item"
              onClick={() => setSelectedRewardKey(key)}
              style={{ cursor: "pointer" }}
            >
              <img src={`/assets/${key}.png`} alt={REWARD_LABELS[key]} />
              <p>{REWARD_LABELS[key]}</p>
            </div>
          ))}
        </Slider>
      </div>
      {/* <div className="gift-left">
        <a href="https://t.me/sancodecung6623a">
          <img src={`/assets/gift-left.gif`} />
        </a>
      </div> */}
      {/* <div className="gift-right">
        <div className="image-right">
          <a href="https://t.me/kenhthongbao6623">
            <img src={`/assets/kenh-thong-bao.gif`} />
          </a>
          <a href="https://6623code.com/">
            <img src={`/assets/nhan-code-vip.gif`} />
          </a>
        </div>
      </div> */}
    </div>
  );
};

export default CodeCheck;
