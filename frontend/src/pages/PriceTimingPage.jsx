import { useCallback, useEffect, useState } from 'react'
import PriceTrendChart from '../components/price/PriceTrendChart.jsx'
import Icon from '../components/common/Icon.jsx'
import { getSeasonalFavorites } from '../services/seasonalFavorites.js'
import { getDemoPriceHistory } from '../services/priceHistoryDemo.js'

function formatPrice(value, currencyCode) {
  if (!Number.isFinite(value)) return '가격 정보 없음'
  try {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: currencyCode || 'KRW',
    }).format(value)
  } catch {
    return `${value.toLocaleString('ko-KR')} ${currencyCode || ''}`.trim()
  }
}

export default function PriceTimingPage({ session }) {
  const [favorites, setFavorites] = useState([])
  const [selectedId, setSelectedId] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadFavorites = useCallback(async () => {
    setError('')
    setLoading(true)
    try {
      const loaded = await getSeasonalFavorites()
      setFavorites(loaded)
      setSelectedId((current) => loaded.some((item) => item.id === current) ? current : loaded[0]?.id || '')
    } catch (loadError) {
      setFavorites([])
      setSelectedId('')
      setError(loadError instanceof Error ? loadError.message : '찜한 상품을 불러오지 못했습니다.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadFavorites()
  }, [loadFavorites, session?.user?.id])

  const selected = favorites.find((favorite) => favorite.id === selectedId)
  const price = Number.isFinite(selected?.price) ? selected.price : null
  const currencyCode = selected?.currencyCode || 'KRW'
  const priceHistory = price !== null && selected
    ? getDemoPriceHistory(price, selected.id)
    : []
  const samplePrices = priceHistory.map((point) => point.price)
  const minimumPrice = samplePrices.length ? Math.min(...samplePrices) : null
  const maximumPrice = samplePrices.length ? Math.max(...samplePrices) : null

  return <main className="inner-page"><div className="page-hero page-hero-clay"><span className="eyebrow">04 / PRICE TREND</span><h1>찜한 코디 상품,<br /><em>가격 흐름 살펴보기.</em></h1><p>시즌 코디에서 찜한 상품을 선택해 예시 가격 변동 그래프를 확인해 보세요.</p><span className="page-hero-mark">↗</span></div>
    <section className="price-dashboard section-wrap">
      <div className="dashboard-heading">
        <div><span className="eyebrow">YOUR FAVORITE PRICE TREND</span><h2>상품별 가격 변동</h2><p>상품을 선택하면 최근 1년간의 월별 예시 가격 흐름을 그래프로 보여줍니다.</p></div>
        <a href="#/seasonal" className="button button-outline">시즌 코디 둘러보기 <Icon name="ArrowRight" size={15} /></a>
      </div>

      {loading && <p className="price-message" role="status">찜한 상품을 불러오는 중입니다.</p>}
      {!loading && error && <p className="price-message price-message-error" role="alert">{error} <button type="button" onClick={loadFavorites}>다시 시도</button></p>}
      {!loading && !error && favorites.length === 0 && <div className="price-message">
        <p>아직 찜한 상품이 없습니다. 시즌 코디에서 관심 있는 상품을 찜해 보세요.</p>
        <a className="button button-dark" href="#/seasonal">시즌 코디 보러 가기</a>
      </div>}

      {!loading && !error && favorites.length > 0 && <>
        <div className="price-favorite-selector" aria-label="가격을 확인할 찜한 상품">
          {favorites.map((favorite) => (
            <button type="button" className={`price-favorite-option${selectedId === favorite.id ? ' is-selected' : ''}`} key={favorite.id} onClick={() => setSelectedId(favorite.id)} aria-pressed={selectedId === favorite.id}>
              <img src={favorite.imageUrl} alt="" loading="lazy" />
              <span><small>{favorite.season} · {favorite.type}</small><strong>{favorite.title}</strong><em>{Number.isFinite(favorite.price) ? formatPrice(favorite.price, favorite.currencyCode) : '기준 가격 없음'}</em></span>
              {selectedId === favorite.id && <Icon name="Check" size={16} />}
            </button>
          ))}
        </div>

        {selected && <section className="price-history-demo" aria-labelledby="price-history-title">
          <div className="panel-top">
            <div><span className="eyebrow">{selected.vendor || '시즌 코디 찜'} · {selected.season} · {selected.type}</span><h2 id="price-history-title">{selected.title}</h2></div>
            <span className="status-pill">시연용 데이터</span>
          </div>
          <p>찜한 시점에 저장된 가격을 기준으로 만든 최근 1년(13개월)의 예시입니다. 실제 판매처에서 수집한 가격 이력이 아닙니다.</p>
          {priceHistory.length > 0 ? <>
            <div className="chart-big"><PriceTrendChart history={priceHistory} currencyCode={currencyCode} /></div>
            <div className="price-stats">
              <div><span>찜할 때 저장한 가격</span><strong>{formatPrice(price, currencyCode)}</strong></div>
              <div><span>예시 최저 가격</span><strong>{formatPrice(minimumPrice, currencyCode)}</strong></div>
              <div><span>예시 최고 가격</span><strong>{formatPrice(maximumPrice, currencyCode)}</strong></div>
            </div>
            <details className="price-history-details">
              <summary>월별 예시 가격 보기</summary>
              <table>
                <caption>실제 가격 이력이 아닌 시연용 생성 데이터입니다.</caption>
                <thead><tr><th scope="col">기준 월</th><th scope="col">예시 가격</th></tr></thead>
                <tbody>{priceHistory.map((point) => <tr key={point.observedAt}>
                  <td>{new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long' }).format(new Date(point.observedAt))}</td>
                  <td>{formatPrice(point.price, currencyCode)}</td>
                </tr>)}</tbody>
              </table>
            </details>
          </> : <p className="price-message">이 상품은 찜할 때 저장된 기준 가격이 없어 예시 그래프를 표시할 수 없습니다.</p>}
        </section>}
      </>}
    </section>
  </main>
}
