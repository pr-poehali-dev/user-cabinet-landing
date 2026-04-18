import { useState } from "react";
import Icon from "@/components/ui/icon";

type TabType = "profile" | "subscription" | "support";
type ProfileTabType = "info" | "password";

const NOTIFICATIONS = [
  { id: 1, text: "Подписка истекает через 7 дней. Продлите, чтобы не потерять доступ.", time: "Сегодня, 10:23", read: false, type: "warning" },
  { id: 2, text: "Тариф «Профессионал» успешно активирован.", time: "15 апр, 14:05", read: true, type: "success" },
  { id: 3, text: "Платёж на сумму 2 990 ₽ прошёл успешно.", time: "1 апр, 09:11", read: true, type: "success" },
];

const FEATURES = [
  { icon: "Zap", label: "До 50 проектов", desc: "Без ограничений по типу", color: "hsl(28 100% 52%)" },
  { icon: "Globe", label: "Свой домен", desc: "Любой домен бесплатно", color: "#3b82f6" },
  { icon: "Shield", label: "SSL-сертификат", desc: "Автовыпуск и продление", color: "#22c55e" },
  { icon: "Database", label: "10 ГБ хранилища", desc: "Файлы и медиа", color: "#a855f7" },
  { icon: "Users", label: "3 участника", desc: "Совместная работа", color: "#ec4899" },
  { icon: "BarChart2", label: "Аналитика", desc: "Полная статистика", color: "#14b8a6" },
];

const FAQS = [
  { q: "Как продлить подписку?", a: "Нажмите «Продлить подписку» в разделе «Мои подписки». Оплата списывается автоматически с привязанной карты." },
  { q: "Можно ли сменить тариф в середине периода?", a: "Да, при смене тарифа вы доплачиваете разницу за оставшееся время." },
  { q: "Как отменить автопродление?", a: "Перейдите в «Управление подпиской» → «Отменить автопродление»." },
  { q: "Сколько времени занимает ответ поддержки?", a: "Мы отвечаем в течение 2–4 рабочих часов по будням." },
];

const NAV = [
  { id: "profile" as TabType, icon: "User", label: "Мои данные" },
  { id: "subscription" as TabType, icon: "CreditCard", label: "Подписки" },
  { id: "support" as TabType, icon: "LifeBuoy", label: "Поддержка" },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [profileTab, setProfileTab] = useState<ProfileTabType>("info");
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifs, setNotifs] = useState(NOTIFICATIONS);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [messageSent, setMessageSent] = useState(false);
  const [message, setMessage] = useState("");
  const [showPasswordSuccess, setShowPasswordSuccess] = useState(false);
  const [profile, setProfile] = useState({ name: "Александр Иванов", email: "alex@example.com", phone: "+7 (999) 123-45-67" });
  const [editProfile, setEditProfile] = useState(profile);
  const [savedProfile, setSavedProfile] = useState(false);

  const unread = notifs.filter(n => !n.read).length;
  const daysLeft = 7;
  const totalDays = 30;
  const progress = ((totalDays - daysLeft) / totalDays) * 100;

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMessageSent(true);
    setMessage("");
    setTimeout(() => setMessageSent(false), 4000);
  };

  const handleSaveProfile = () => {
    setProfile(editProfile);
    setSavedProfile(true);
    setTimeout(() => setSavedProfile(false), 3000);
  };

  const handleSavePassword = () => {
    setShowPasswordSuccess(true);
    setTimeout(() => setShowPasswordSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen lk-bg font-golos">
      {/* Decorative blobs */}
      <div className="lk-blob lk-blob-1" />
      <div className="lk-blob lk-blob-2" />

      {/* Header */}
      <header className="lk-header">
        <div className="flex items-center gap-3">
          <div className="lk-logo">
            <Icon name="Sparkles" size={15} />
          </div>
          <span className="font-semibold text-base tracking-tight text-gray-900">Личный кабинет</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifs(!showNotifs)}
              className="lk-icon-btn"
            >
              <Icon name="Bell" size={18} style={{ color: unread > 0 ? "hsl(28 100% 54%)" : "#9ca3af" }} />
              {unread > 0 && <span className="lk-notif-dot" />}
            </button>

            {showNotifs && (
              <div className="lk-notif-panel animate-scale-in">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-gray-900">Уведомления</span>
                    {unread > 0 && (
                      <span className="lk-badge-orange">{unread}</span>
                    )}
                  </div>
                  {unread > 0 && (
                    <button onClick={markAllRead} className="text-xs font-medium lk-link">
                      Прочитать все
                    </button>
                  )}
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
                  {notifs.map(n => (
                    <div key={n.id} className={`px-4 py-3.5 flex gap-3 transition-colors hover:bg-gray-50/70 ${n.read ? "opacity-50" : ""}`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${n.type === "warning" ? "bg-orange-50" : "bg-green-50"}`}>
                        <Icon
                          name={n.type === "warning" ? "AlertCircle" : "CheckCircle2"}
                          size={13}
                          style={{ color: n.type === "warning" ? "hsl(28 100% 54%)" : "#22c55e" }}
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-700 leading-snug">{n.text}</p>
                        <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Avatar */}
          <div className="lk-avatar">
            {profile.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
          </div>
        </div>
      </header>

      {showNotifs && <div className="fixed inset-0 z-40" onClick={() => setShowNotifs(false)} />}

      <div className="max-w-5xl mx-auto px-4 pt-6 pb-16 flex gap-6">

        {/* Sidebar */}
        <aside className="w-52 shrink-0 hidden md:flex flex-col gap-2">
          {/* User mini card */}
          <div className="lk-user-card">
            <div className="lk-avatar-lg">
              {profile.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
            </div>
            <p className="font-semibold text-sm text-gray-900 truncate">{profile.name}</p>
            <p className="text-xs text-gray-400 truncate">{profile.email}</p>
          </div>

          {/* Nav */}
          <nav className="lk-card p-1.5 flex flex-col gap-0.5">
            {NAV.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`lk-nav-btn ${activeTab === item.id ? "lk-nav-btn--active" : ""}`}
              >
                <Icon name={item.icon} size={16} />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Subscription pill */}
          <div className="lk-sub-pill">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-orange-500">Профессионал</span>
              <span className="text-xs font-bold text-gray-900">{daysLeft}д</span>
            </div>
            <div className="lk-progress-track">
              <div className="lk-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-gray-400 mt-1.5">до 25 апреля 2026</p>
          </div>
        </aside>

        {/* Mobile nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 lk-mobile-nav">
          {NAV.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`lk-mobile-nav-btn ${activeTab === item.id ? "lk-mobile-nav-btn--active" : ""}`}
            >
              <Icon name={item.icon} size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <main className="flex-1 min-w-0 space-y-4 pb-20 md:pb-0" key={activeTab}>

          {/* ── PROFILE ── */}
          {activeTab === "profile" && (
            <div className="animate-fade-in space-y-4">
              <div className="lk-page-header">
                <div>
                  <h1 className="lk-h1">Мои данные</h1>
                  <p className="lk-sub">Личная информация и безопасность аккаунта</p>
                </div>
              </div>

              <div className="lk-card overflow-hidden">
                {/* Top banner */}
                <div className="lk-card-banner">
                  <div className="flex items-center gap-4">
                    <div className="lk-avatar-xl">
                      {profile.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg leading-tight">{profile.name}</p>
                      <p className="text-orange-200 text-sm">{profile.email}</p>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-100 px-6">
                  {([{ id: "info" as ProfileTabType, label: "Личные данные", icon: "User" }, { id: "password" as ProfileTabType, label: "Смена пароля", icon: "Lock" }]).map(t => (
                    <button
                      key={t.id}
                      onClick={() => setProfileTab(t.id)}
                      className={`lk-tab ${profileTab === t.id ? "lk-tab--active" : ""}`}
                    >
                      <Icon name={t.icon} size={14} />
                      {t.label}
                    </button>
                  ))}
                </div>

                <div className="p-6">
                  {profileTab === "info" && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="lk-label">ФИО</label>
                          <input className="lk-input" value={editProfile.name} onChange={e => setEditProfile({ ...editProfile, name: e.target.value })} placeholder="Иванов Иван Иванович" />
                        </div>
                        <div>
                          <label className="lk-label">Телефон</label>
                          <input className="lk-input" value={editProfile.phone} onChange={e => setEditProfile({ ...editProfile, phone: e.target.value })} placeholder="+7 (999) 000-00-00" />
                        </div>
                      </div>
                      <div>
                        <label className="lk-label">Email</label>
                        <input className="lk-input" value={editProfile.email} onChange={e => setEditProfile({ ...editProfile, email: e.target.value })} placeholder="email@example.com" />
                      </div>
                      {savedProfile && (
                        <div className="lk-success-msg animate-fade-in">
                          <Icon name="CheckCircle2" size={15} />
                          Данные успешно сохранены
                        </div>
                      )}
                      <button onClick={handleSaveProfile} className="lk-btn-primary">
                        Сохранить изменения
                      </button>
                    </div>
                  )}

                  {profileTab === "password" && (
                    <div className="space-y-4 animate-fade-in">
                      <div>
                        <label className="lk-label">Текущий пароль</label>
                        <input className="lk-input" type="password" placeholder="Введите текущий пароль" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="lk-label">Новый пароль</label>
                          <input className="lk-input" type="password" placeholder="Минимум 8 символов" />
                        </div>
                        <div>
                          <label className="lk-label">Повторите пароль</label>
                          <input className="lk-input" type="password" placeholder="Повторите пароль" />
                        </div>
                      </div>
                      {showPasswordSuccess && (
                        <div className="lk-success-msg animate-fade-in">
                          <Icon name="CheckCircle2" size={15} />
                          Пароль успешно изменён
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <button onClick={handleSavePassword} className="lk-btn-primary">
                          Изменить пароль
                        </button>
                        <p className="text-xs text-gray-400">Не менее 8 символов, латиница и цифры</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Activity strip */}
              <div className="lk-card p-4 flex items-center gap-4">
                <div className="lk-activity-icon">
                  <Icon name="Activity" size={16} style={{ color: "hsl(28 100% 54%)" }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Последний вход</p>
                  <p className="text-xs text-gray-400">Сегодня в 09:14 · Москва · Chrome / macOS</p>
                </div>
                <span className="lk-badge-green">Активен</span>
              </div>
            </div>
          )}

          {/* ── SUBSCRIPTION ── */}
          {activeTab === "subscription" && (
            <div className="animate-fade-in space-y-4">
              <div className="lk-page-header">
                <div>
                  <h1 className="lk-h1">Подписки</h1>
                  <p className="lk-sub">Управление тарифом и оплатой</p>
                </div>
              </div>

              {/* Main plan card */}
              <div className="lk-plan-card">
                <div className="lk-plan-card-inner">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="lk-plan-badge">● Активен</span>
                        <span className="text-xs text-gray-400">до 25 апреля 2026</span>
                      </div>
                      <h2 className="text-2xl font-black text-gray-900 tracking-tight">Профессионал</h2>
                      <p className="text-gray-400 text-sm mt-1">2 990 ₽ / месяц · автопродление включено</p>
                    </div>
                    <div className="lk-days-counter">
                      <span className="lk-days-num">{daysLeft}</span>
                      <span className="lk-days-label">дней</span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mt-5">
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                      <span>Использовано {totalDays - daysLeft} дней</span>
                      <span>{daysLeft} осталось</span>
                    </div>
                    <div className="lk-progress-track-lg">
                      <div className="lk-progress-fill-lg" style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  {/* Notification hint */}
                  <div className="mt-4 flex items-start gap-2.5 lk-hint-block">
                    <Icon name="BellRing" size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(28 100% 54%)" }} />
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Уведомление о продлении отправлено на <strong className="text-gray-700">{profile.email}</strong>
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    <button className="lk-btn-primary flex items-center gap-2">
                      <Icon name="RefreshCw" size={14} />
                      Продлить
                    </button>
                    <button className="lk-btn-secondary flex items-center gap-2">
                      <Icon name="Repeat2" size={14} />
                      Сменить тариф
                    </button>
                    <button className="lk-btn-ghost flex items-center gap-2">
                      <Icon name="Settings2" size={14} />
                      Управление
                    </button>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="lk-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900">Включено в тариф</h3>
                  <span className="text-xs text-gray-400">6 возможностей</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {FEATURES.map((f, i) => (
                    <div key={i} className="lk-feature-item">
                      <div className="lk-feature-icon" style={{ background: `${f.color}18` }}>
                        <Icon name={f.icon} size={14} style={{ color: f.color }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{f.label}</p>
                        <p className="text-xs text-gray-400">{f.desc}</p>
                      </div>
                      <Icon name="Check" size={13} className="ml-auto shrink-0" style={{ color: "#22c55e" }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment history */}
              <div className="lk-card p-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">История платежей</h3>
                <div className="space-y-2">
                  {[
                    { date: "1 апр 2026", amount: "2 990 ₽", status: "Успешно" },
                    { date: "1 мар 2026", amount: "2 990 ₽", status: "Успешно" },
                    { date: "1 фев 2026", amount: "2 990 ₽", status: "Успешно" },
                  ].map((p, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center">
                          <Icon name="Receipt" size={12} style={{ color: "#22c55e" }} />
                        </div>
                        <span className="text-sm text-gray-600">{p.date}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-gray-900">{p.amount}</span>
                        <span className="lk-badge-green">{p.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── SUPPORT ── */}
          {activeTab === "support" && (
            <div className="animate-fade-in space-y-4">
              <div className="lk-page-header">
                <div>
                  <h1 className="lk-h1">Поддержка</h1>
                  <p className="lk-sub">Отвечаем в течение 2–4 часов в рабочее время</p>
                </div>
                <div className="lk-badge-online">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Онлайн
                </div>
              </div>

              {/* Contact cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: "MessageCircle", label: "Telegram", desc: "Быстрый ответ", handle: "@support_team", color: "#2AABEE", bg: "#EFF9FF" },
                  { icon: "Mail", label: "Email", desc: "Подробные запросы", handle: "support@company.ru", color: "hsl(28 100% 54%)", bg: "#FFF7ED" },
                ].map((c, i) => (
                  <div key={i} className="lk-contact-card group">
                    <div className="lk-contact-icon" style={{ background: c.bg }}>
                      <Icon name={c.icon} size={20} style={{ color: c.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm text-gray-900">{c.label}</p>
                        <span className="text-xs text-gray-400">{c.desc}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{c.handle}</p>
                    </div>
                    <Icon name="ArrowUpRight" size={14} className="text-gray-300 group-hover:text-orange-400 transition-colors" />
                  </div>
                ))}
              </div>

              {/* Message form */}
              <div className="lk-card p-5">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="lk-activity-icon">
                    <Icon name="Pen" size={14} style={{ color: "hsl(28 100% 54%)" }} />
                  </div>
                  <h3 className="font-semibold text-gray-900">Новое обращение</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="lk-label">Тема</label>
                    <input className="lk-input" placeholder="Кратко опишите проблему..." />
                  </div>
                  <div>
                    <label className="lk-label">Сообщение</label>
                    <textarea className="lk-input lk-textarea" placeholder="Подробно опишите ситуацию..." value={message} onChange={e => setMessage(e.target.value)} />
                  </div>
                  {messageSent && (
                    <div className="lk-success-msg animate-fade-in">
                      <Icon name="CheckCircle2" size={15} />
                      Отправлено! Ответим на {profile.email}
                    </div>
                  )}
                  <button onClick={handleSendMessage} className="lk-btn-primary flex items-center gap-2">
                    <Icon name="SendHorizonal" size={14} />
                    Отправить
                  </button>
                </div>
              </div>

              {/* FAQ */}
              <div className="lk-card p-5">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="lk-activity-icon">
                    <Icon name="HelpCircle" size={14} style={{ color: "hsl(28 100% 54%)" }} />
                  </div>
                  <h3 className="font-semibold text-gray-900">Частые вопросы</h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {FAQS.map((item, i) => (
                    <div key={i}>
                      <button
                        className="w-full flex items-center justify-between py-3.5 text-left group"
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      >
                        <span className={`text-sm font-medium pr-4 transition-colors ${openFaq === i ? "text-orange-500" : "text-gray-700 group-hover:text-gray-900"}`}>{item.q}</span>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${openFaq === i ? "bg-orange-100" : "bg-gray-100"}`}>
                          <Icon
                            name="ChevronDown"
                            size={13}
                            style={{
                              color: openFaq === i ? "hsl(28 100% 54%)" : "#9ca3af",
                              transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                              transition: "transform 0.2s"
                            }}
                          />
                        </div>
                      </button>
                      {openFaq === i && (
                        <p className="pb-3.5 text-sm text-gray-500 leading-relaxed animate-fade-in pr-8">
                          {item.a}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}