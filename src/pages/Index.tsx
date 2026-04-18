import { useState } from "react";
import Icon from "@/components/ui/icon";

type TabType = "profile" | "subscription" | "support";
type ProfileTabType = "info" | "password";

const NOTIFICATIONS = [
  { id: 1, text: "Ваша подписка истекает через 7 дней. Продлите, чтобы не потерять доступ.", time: "Сегодня, 10:23", read: false, type: "warning" },
  { id: 2, text: "Тариф «Профессионал» успешно активирован.", time: "15 апр, 14:05", read: true, type: "success" },
  { id: 3, text: "Платёж на сумму 2 990 ₽ прошёл успешно.", time: "1 апр, 09:11", read: true, type: "success" },
];

const FEATURES = [
  { icon: "Zap", label: "До 50 проектов" },
  { icon: "Globe", label: "Свой домен" },
  { icon: "Shield", label: "SSL-сертификат" },
  { icon: "Database", label: "10 ГБ хранилища" },
  { icon: "Users", label: "3 участника" },
  { icon: "BarChart2", label: "Аналитика" },
];

const FAQS = [
  { q: "Как продлить подписку?", a: "Нажмите «Продлить подписку» в разделе «Мои подписки». Оплата списывается автоматически с привязанной карты." },
  { q: "Можно ли сменить тариф в середине периода?", a: "Да, при смене тарифа вы доплачиваете разницу за оставшееся время." },
  { q: "Как отменить автопродление?", a: "Перейдите в «Управление подпиской» → «Отменить автопродление»." },
  { q: "Сколько времени занимает ответ поддержки?", a: "Мы отвечаем в течение 2–4 рабочих часов по будням." },
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
  };

  const handleSavePassword = () => {
    setShowPasswordSuccess(true);
    setTimeout(() => setShowPasswordSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background font-golos flex flex-col" style={{ backgroundImage: "radial-gradient(ellipse at 80% 0%, rgba(255,138,0,0.06) 0%, transparent 50%)" }}>
      {/* Header */}
      <header className="border-b border-border/60 px-6 py-4 flex items-center justify-between sticky top-0 z-50" style={{ background: "rgba(15,17,22,0.85)", backdropFilter: "blur(12px)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg btn-orange flex items-center justify-center">
            <Icon name="User" size={16} />
          </div>
          <span className="font-semibold text-lg tracking-tight">Личный кабинет</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setShowNotifs(!showNotifs)}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-white/5"
              style={{ color: unread > 0 ? "hsl(28 100% 54%)" : "hsl(220 10% 55%)" }}
            >
              <Icon name="Bell" size={20} />
              {unread > 0 && (
                <span className="notification-dot absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: "hsl(28 100% 54%)" }} />
              )}
            </button>

            {showNotifs && (
              <div className="absolute right-0 top-11 w-80 rounded-xl border border-border/60 shadow-2xl z-50 overflow-hidden animate-scale-in" style={{ background: "hsl(220 14% 11%)" }}>
                <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
                  <span className="font-semibold text-sm">Уведомления</span>
                  {unread > 0 && (
                    <button onClick={markAllRead} className="text-xs transition-colors" style={{ color: "hsl(28 100% 54%)" }}>
                      Отметить все
                    </button>
                  )}
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifs.map(n => (
                    <div key={n.id} className={`px-4 py-3 border-b border-border/20 transition-colors ${n.read ? "opacity-60" : ""}`} style={{ borderLeft: n.read ? "3px solid transparent" : "3px solid hsl(28 100% 54%)" }}>
                      <div className="flex gap-2">
                        <Icon name={n.type === "warning" ? "AlertTriangle" : "CheckCircle"} size={14} className="mt-0.5 shrink-0" style={{ color: n.type === "warning" ? "hsl(28 100% 54%)" : "#4ade80" }} />
                        <div>
                          <p className="text-sm leading-snug">{n.text}</p>
                          <p className="text-xs mt-1" style={{ color: "hsl(220 10% 50%)" }}>{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg, hsl(28 100% 54%), hsl(22 100% 42%))", color: "white" }}>
            АИ
          </div>
        </div>
      </header>

      {showNotifs && <div className="fixed inset-0 z-40" onClick={() => setShowNotifs(false)} />}

      <div className="flex flex-1 max-w-5xl mx-auto w-full px-4 py-8 gap-6">
        {/* Sidebar */}
        <aside className="w-56 shrink-0 hidden md:block">
          <nav className="space-y-1 sticky top-24">
            {([
              { id: "profile", icon: "User", label: "Мои данные" },
              { id: "subscription", icon: "CreditCard", label: "Мои подписки" },
              { id: "support", icon: "MessageCircle", label: "Поддержка" },
            ] as { id: TabType; icon: string; label: string }[]).map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left ${activeTab === item.id ? "active" : ""}`}
                style={{ color: activeTab === item.id ? "hsl(28 100% 54%)" : "hsl(220 10% 65%)" }}
              >
                <Icon name={item.icon} size={17} />
                {item.label}
              </button>
            ))}

            <div className="mt-6 rounded-xl p-3" style={{ background: "rgba(255,138,0,0.07)", border: "1px solid rgba(255,138,0,0.15)" }}>
              <p className="text-xs font-medium mb-1" style={{ color: "hsl(28 100% 54%)" }}>Профессионал</p>
              <div className="w-full h-1.5 rounded-full mb-1" style={{ background: "hsl(220 12% 18%)" }}>
                <div className="progress-bar-orange h-1.5" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-xs" style={{ color: "hsl(220 10% 50%)" }}>Осталось {daysLeft} дней</p>
            </div>
          </nav>
        </aside>

        {/* Mobile tabs */}
        <div className="md:hidden flex gap-1 mb-4 w-full">
          {([
            { id: "profile", icon: "User", label: "Данные" },
            { id: "subscription", icon: "CreditCard", label: "Подписка" },
            { id: "support", icon: "MessageCircle", label: "Поддержка" },
          ] as { id: TabType; icon: string; label: string }[]).map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-lg text-xs font-medium transition-all`}
              style={{
                background: activeTab === item.id ? "rgba(255,138,0,0.1)" : "transparent",
                color: activeTab === item.id ? "hsl(28 100% 54%)" : "hsl(220 10% 55%)"
              }}
            >
              <Icon name={item.icon} size={16} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Main content */}
        <main className="flex-1 min-w-0 animate-fade-in">

          {/* === PROFILE === */}
          {activeTab === "profile" && (
            <div className="space-y-5">
              <div>
                <h1 className="text-2xl font-bold">Мои данные</h1>
                <p className="text-sm mt-1" style={{ color: "hsl(220 10% 50%)" }}>Управляйте личной информацией и безопасностью</p>
              </div>

              <div className="rounded-2xl p-5" style={{ background: "hsl(220 14% 11%)", border: "1px solid hsl(220 12% 18%)" }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold shrink-0" style={{ background: "linear-gradient(135deg, hsl(28 100% 54%), hsl(22 100% 42%))", color: "white" }}>
                    {profile.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{profile.name}</p>
                    <p className="text-sm" style={{ color: "hsl(220 10% 50%)" }}>{profile.email}</p>
                  </div>
                </div>

                <div className="flex gap-0 border-b border-border/40 mb-5">
                  {([{ id: "info", label: "Личные данные" }, { id: "password", label: "Смена пароля" }] as { id: ProfileTabType; label: string }[]).map(t => (
                    <button
                      key={t.id}
                      onClick={() => setProfileTab(t.id)}
                      className={`px-4 py-2 text-sm font-medium transition-all -mb-px ${profileTab === t.id ? "tab-active" : ""}`}
                      style={{ color: profileTab === t.id ? "hsl(28 100% 54%)" : "hsl(220 10% 55%)" }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {profileTab === "info" && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: "hsl(220 10% 55%)" }}>ФИО</label>
                        <input className="input-dark" value={editProfile.name} onChange={e => setEditProfile({ ...editProfile, name: e.target.value })} placeholder="Иванов Иван Иванович" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: "hsl(220 10% 55%)" }}>Телефон</label>
                        <input className="input-dark" value={editProfile.phone} onChange={e => setEditProfile({ ...editProfile, phone: e.target.value })} placeholder="+7 (999) 000-00-00" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: "hsl(220 10% 55%)" }}>Email</label>
                      <input className="input-dark" value={editProfile.email} onChange={e => setEditProfile({ ...editProfile, email: e.target.value })} placeholder="email@example.com" />
                    </div>
                    <div className="pt-1">
                      <button onClick={handleSaveProfile} className="btn-orange px-5 py-2.5 rounded-lg text-sm font-semibold">
                        Сохранить изменения
                      </button>
                    </div>
                  </div>
                )}

                {profileTab === "password" && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: "hsl(220 10% 55%)" }}>Текущий пароль</label>
                      <input className="input-dark" type="password" placeholder="••••••••" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: "hsl(220 10% 55%)" }}>Новый пароль</label>
                        <input className="input-dark" type="password" placeholder="Минимум 8 символов" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: "hsl(220 10% 55%)" }}>Повторите пароль</label>
                        <input className="input-dark" type="password" placeholder="••••••••" />
                      </div>
                    </div>
                    {showPasswordSuccess && (
                      <div className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg animate-fade-in" style={{ background: "rgba(74, 222, 128, 0.08)", border: "1px solid rgba(74, 222, 128, 0.2)", color: "#4ade80" }}>
                        <Icon name="CheckCircle" size={15} />
                        Пароль успешно изменён
                      </div>
                    )}
                    <div className="pt-1">
                      <button onClick={handleSavePassword} className="btn-orange px-5 py-2.5 rounded-lg text-sm font-semibold">
                        Изменить пароль
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* === SUBSCRIPTION === */}
          {activeTab === "subscription" && (
            <div className="space-y-5">
              <div>
                <h1 className="text-2xl font-bold">Мои подписки</h1>
                <p className="text-sm mt-1" style={{ color: "hsl(220 10% 50%)" }}>Управляйте тарифом и настройками оплаты</p>
              </div>

              <div className="rounded-2xl p-5 animate-pulse-orange" style={{ background: "hsl(220 14% 11%)", border: "1px solid rgba(255,138,0,0.25)" }}>
                <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(255,138,0,0.15)", color: "hsl(28 100% 54%)" }}>
                        Активен
                      </span>
                      <span className="text-xs" style={{ color: "hsl(220 10% 50%)" }}>до 25 апреля 2026</span>
                    </div>
                    <h2 className="text-xl font-bold">Профессионал</h2>
                    <p className="text-sm mt-0.5" style={{ color: "hsl(220 10% 55%)" }}>2 990 ₽ / месяц</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black" style={{ color: "hsl(28 100% 54%)" }}>{daysLeft}</p>
                    <p className="text-xs" style={{ color: "hsl(220 10% 50%)" }}>дней осталось</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1.5" style={{ color: "hsl(220 10% 50%)" }}>
                    <span>Использовано</span>
                    <span>{totalDays - daysLeft} из {totalDays} дней</span>
                  </div>
                  <div className="w-full h-2 rounded-full" style={{ background: "hsl(220 12% 18%)" }}>
                    <div className="progress-bar-orange h-2" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <div className="flex items-start gap-2.5 rounded-lg px-3.5 py-2.5 mb-4" style={{ background: "rgba(255,138,0,0.07)", border: "1px solid rgba(255,138,0,0.15)" }}>
                  <Icon name="Bell" size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(28 100% 54%)" }} />
                  <p className="text-xs leading-relaxed" style={{ color: "hsl(40 20% 75%)" }}>
                    Уведомление о продлении отправлено на <strong>{profile.email}</strong>. Автопродление включено.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button className="btn-orange px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-1.5">
                    <Icon name="RefreshCw" size={14} />
                    Продлить подписку
                  </button>
                  <button className="px-4 py-2.5 rounded-lg text-sm font-medium transition-all hover:bg-white/5 flex items-center gap-1.5" style={{ border: "1px solid hsl(220 12% 22%)", color: "hsl(40 20% 85%)" }}>
                    <Icon name="ArrowUpDown" size={14} />
                    Сменить тариф
                  </button>
                  <button className="px-4 py-2.5 rounded-lg text-sm font-medium transition-all hover:bg-white/5 flex items-center gap-1.5" style={{ border: "1px solid hsl(220 12% 22%)", color: "hsl(220 10% 55%)" }}>
                    <Icon name="Settings" size={14} />
                    Управление
                  </button>
                </div>
              </div>

              <div className="rounded-2xl p-5" style={{ background: "hsl(220 14% 11%)", border: "1px solid hsl(220 12% 18%)" }}>
                <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider" style={{ color: "hsl(220 10% 45%)" }}>Возможности тарифа</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {FEATURES.map((f, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl transition-all hover:bg-white/3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(255,138,0,0.1)" }}>
                        <Icon name={f.icon} size={15} style={{ color: "hsl(28 100% 54%)" }} />
                      </div>
                      <span className="text-sm font-medium">{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* === SUPPORT === */}
          {activeTab === "support" && (
            <div className="space-y-5">
              <div>
                <h1 className="text-2xl font-bold">Поддержка</h1>
                <p className="text-sm mt-1" style={{ color: "hsl(220 10% 50%)" }}>Мы отвечаем в течение 2–4 часов в рабочее время</p>
              </div>

              <div className="rounded-2xl p-5" style={{ background: "hsl(220 14% 11%)", border: "1px solid hsl(220 12% 18%)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="MessageSquare" size={18} style={{ color: "hsl(28 100% 54%)" }} />
                  <h3 className="font-semibold">Написать сообщение</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "hsl(220 10% 55%)" }}>Тема обращения</label>
                    <input className="input-dark" placeholder="Кратко опишите проблему..." />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "hsl(220 10% 55%)" }}>Сообщение</label>
                    <textarea className="input-dark" placeholder="Подробно опишите ситуацию..." value={message} onChange={e => setMessage(e.target.value)} />
                  </div>
                  {messageSent && (
                    <div className="flex items-center gap-2 text-sm px-3 py-2.5 rounded-lg animate-fade-in" style={{ background: "rgba(74, 222, 128, 0.08)", border: "1px solid rgba(74, 222, 128, 0.2)", color: "#4ade80" }}>
                      <Icon name="CheckCircle" size={15} />
                      Сообщение отправлено! Мы ответим на {profile.email}
                    </div>
                  )}
                  <button onClick={handleSendMessage} className="btn-orange px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2">
                    <Icon name="Send" size={14} />
                    Отправить
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: "MessageCircle", label: "Telegram", desc: "@support_team", color: "#2AABEE" },
                  { icon: "Mail", label: "Email", desc: "support@example.com", color: "hsl(28 100% 54%)" },
                ].map((c, i) => (
                  <div key={i} className="rounded-xl p-4 flex items-center gap-3 cursor-pointer transition-all hover:bg-white/4" style={{ background: "hsl(220 14% 11%)", border: "1px solid hsl(220 12% 18%)" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${c.color}18` }}>
                      <Icon name={c.icon} size={18} style={{ color: c.color }} />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{c.label}</p>
                      <p className="text-xs" style={{ color: "hsl(220 10% 50%)" }}>{c.desc}</p>
                    </div>
                    <Icon name="ChevronRight" size={14} className="ml-auto" style={{ color: "hsl(220 10% 40%)" }} />
                  </div>
                ))}
              </div>

              <div className="rounded-2xl p-5" style={{ background: "hsl(220 14% 11%)", border: "1px solid hsl(220 12% 18%)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="HelpCircle" size={18} style={{ color: "hsl(28 100% 54%)" }} />
                  <h3 className="font-semibold">Часто задаваемые вопросы</h3>
                </div>
                <div>
                  {FAQS.map((item, i) => (
                    <div key={i} className="faq-item">
                      <button className="w-full flex items-center justify-between py-3.5 px-1 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                        <span className="text-sm font-medium pr-4">{item.q}</span>
                        <Icon name="ChevronDown" size={15} className="shrink-0 transition-transform duration-200" style={{ color: "hsl(220 10% 50%)", transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }} />
                      </button>
                      {openFaq === i && (
                        <p className="px-1 pb-3.5 text-sm leading-relaxed animate-fade-in" style={{ color: "hsl(220 10% 58%)" }}>
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
