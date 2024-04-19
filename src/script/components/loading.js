class Loading extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: "open" });
        this._shadowRoot.innerHTML = `
            <style>
                #loadingIndicator {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(255, 255, 255, 0.5); /* Transparan */
                    z-index: 9999; /* Pastikan indikator loading muncul di atas konten */
                }
                
                .loading-spinner {
                    border: 4px solid rgba(0, 0, 0, 0.3); /* Warna border */
                    border-top: 4px solid #007bff; /* Warna border bagian atas */
                    border-radius: 50%; /* Membuat bentuk lingkaran */
                    width: 40px; /* Lebar lingkaran */
                    height: 40px; /* Tinggi lingkaran */
                    animation: spin 1s linear infinite; /* Animasi putar */
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); } /* Rotasi awal */
                    100% { transform: rotate(360deg); } /* Rotasi setelah satu putaran penuh */
                }
                
                .loading-text {
                    margin-left: 10px; /* Jarak antara ikon loading dan teks */
                    font-size: 16px; /* Ukuran teks */
                    color: #333; /* Warna teks */
                }
            </style>
            <div id="loadingIndicator" style="display: none;">
                <div class="loading-spinner"></div>
                <div class="loading-text">Loading...</div>
            </div>
        `;
    }
}

customElements.define("loading-indicator", Loading);
