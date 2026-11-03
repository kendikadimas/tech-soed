$cfg = Get-Content "$HOME\.claude\settings.json" -Raw | ConvertFrom-Json

$headers = @{
    Authorization = "Bearer $($cfg.env.ANTHROPIC_AUTH_TOKEN)"
    "Content-Type" = "application/json"
    "anthropic-version" = "2023-06-01"
}

$body = @{
    model = "woy"
    max_tokens = 64
    messages = @(
        @{
            role = "user"
            content = "Balas hanya: Koneksi berhasil"
        }
    )
} | ConvertTo-Json -Depth 10

Measure-Command {
    Invoke-RestMethod `
        -Uri "http://localhost:20128/v1/messages" `
        -Method POST `
        -Headers $headers `
        -Body $body
}
